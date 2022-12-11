import { Component, OnInit, ViewChild } from '@angular/core';
import { Cuenta } from 'src/app/models/cuenta';
import { MonedasDeCuenta } from 'src/app/models/monedasDeCuenta';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { DepositoComponent } from '../deposito/deposito.component';

@Component({
  selector: 'app-ultimos-movimientos',
  templateUrl: './ultimos-movimientos.component.html',
  styleUrls: ['./ultimos-movimientos.component.css']
})
export class UltimosMovimientosComponent implements OnInit {
  user:any;
  hoy= new Date();
  cuenta: Cuenta = new  Cuenta(0,0);
  movimientos:any;
  billetera: any;
  bitcoin=0;
  constructor(private myService: CuentaService, private comunicacion:ComunicacionService) 
  {
   
  }

  ngOnChanges():void{
    location.reload();
  }
 

  ngOnInit(): void {
    this.getCuenta();
    this.getBilletera();
    this.getMovimientos();
    
  }

  getAll(){
    //this.myService.obtenerUltimosMovimientos().subscribe((data=>{this.movimientos = data}))
  }

  getCuenta(){
    this.user= this.comunicacion.getUser();
    if(this.user.idCuenta != null){
      this.myService.obtenerCuenta(this.user.idCuenta).subscribe({
        next: (data) => {
          
          this.cuenta=data;
        }
      })
    }
    
  }

  getBilletera(){
    this.user= this.comunicacion.getUser();
    
    if(this.user.idCuenta == null){
      this.billetera=[];
    }
    else{
      this.myService.obtenerBilletera(this.user.idCuenta).subscribe(data=>{
       
        this.billetera=data
      });
      console.log(this.billetera)
      
    }
    }

    getMovimientos(){
      this.user= this.comunicacion.getUser();
      this.myService.obtenerMovimientos(this.user.idCuenta).subscribe(data =>{this.movimientos = data, console.log(data)} );
      }
    
    //ya arregle el back para que traiga una lista probar mañana esto para traer siempre asi para que queden los arrays y no se rompa el ngfor
    

}
