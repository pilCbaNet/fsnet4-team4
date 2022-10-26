import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http'

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}


@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {


  leerMas() {
    const element: HTMLElement = document.getElementById('hideTextBtn') as HTMLElement
    element.innerHTML = 'El volumen de comercio de criptomonedas total en el último día es de 100 mil millones $. El dominio de Bitcoin es del <span class="text-success">40 %</span>, mientras que el dominio de Ethereum es del <span class="text-success">20 %</span>. En este momento, CoinGecko rastrea <span class="text-success">13.260 criptomonedas</span>. Las tendencias populares del sector son <span class="text-success">Finance / Banking </span> y <span class="text-success">Decentralized Exchange (DEX).</span>'
    element.style.textDecoration = 'none';
    element.style.color = 'grey';
    element.style.cursor = 'text';
  }

  coins: Coin[] = []
  filteredCoins: Coin[] = []
  titles: string [] = [
    '#',
    'Coin',
    'Price',
    'Price Change',
    '24 h Volume'
  ]

  searchText = '';
  searchCoin(){
    this.filteredCoins = this.coins.filter((coin) =>
    coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
  )}


   constructor(private http: HttpClient) {}




  ngOnInit(): void {
    this.http.get<Coin[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').subscribe((res) => {
      console.log(res);
      this.coins = res
      this.filteredCoins = res;
    }, err => {
      console.log(err)
    });
  }

}
