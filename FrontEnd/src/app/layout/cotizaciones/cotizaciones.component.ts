import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CotizacionesService } from 'src/app/services/cotizaciones.service';

interface Moneda {
  nombre: string;
  precioXunidad: number;
}

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {


  leerMas() {
    const element: HTMLElement = document.getElementById('hideTextBtn') as HTMLElement
    element.innerHTML = '<p>El volumen de comercio de criptomonedas total en el último día es de <span class="text-success">100 mil millones $.</span> El dominio de Bitcoin es del <span class="text-success">40 %</span>, mientras que el dominio de <span>Ethereum</span> es del <span class="text-success">20 %</span>. En este momento, <span>CoinGecko</span> rastrea <span class="text-success">13.260 criptomonedas</span>. Las tendencias populares del sector son <span class="text-success">Finance / Banking </span> y <span class="text-success">Decentralized Exchange (DEX).</span></p>'
    element.style.textDecoration = 'none';
    element.style.color = 'grey';
    element.style.cursor = 'text';
  }

  monedas: Moneda[] = []
  titles: string [] = [
    '#',
    'Moneda',
    'Precio',
  ]

  constructor(private http: HttpClient, private myService:CotizacionesService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.myService.obtenerMonedas().subscribe((data=>{this.monedas = data}))
  }

}