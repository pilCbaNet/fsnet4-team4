import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CotizacionesService } from 'src/app/services/cotizaciones.service';

interface Moneda {
  idMoneda: number;
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
    element.innerHTML = '<p>Hoy, la capitalización de mercado global de las criptomonedas es de 1 billón $, lo que supone un cambio del 3.4% en las últimas 24 horas.</p>'
    element.style.textDecoration = 'none';
    element.style.color = 'grey';
    element.style.cursor = 'text';
  }

  monedas: Moneda[] = []
  titles: string [] = [
    'Iconos',
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