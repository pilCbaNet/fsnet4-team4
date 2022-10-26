import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/services/cuenta.service';

@Component({
  selector: 'app-ultimos-movimientos',
  templateUrl: './ultimos-movimientos.component.html',
  styleUrls: ['./ultimos-movimientos.component.css']
})
export class UltimosMovimientosComponent implements OnInit {
  hoy= new Date();
  movimientos:any;
  constructor(private myService: CuentaService) 
  {
   
   }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
      this.myService.obtenerUltimosMovimientos().subscribe((data=>{this.movimientos = data}))
  }

}
