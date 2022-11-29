import { Component, OnInit, ViewChild } from '@angular/core';
import { CuentaService } from 'src/app/services/cuenta.service';
import { DepositoComponent } from '../deposito/deposito.component';

@Component({
  selector: 'app-ultimos-movimientos',
  templateUrl: './ultimos-movimientos.component.html',
  styleUrls: ['./ultimos-movimientos.component.css']
})
export class UltimosMovimientosComponent implements OnInit {
  hoy= new Date();
  movimientos:any;
  bitcoin=0;
  constructor(private myService: CuentaService) 
  {
   
  }

  ngOnChanges():void{
    location.reload();
  }
 

  ngOnInit(): void {
    this.getAll();
    
  }

  getAll(){
    this.myService.obtenerUltimosMovimientos().subscribe((data=>{this.movimientos = data}))
  }

}
