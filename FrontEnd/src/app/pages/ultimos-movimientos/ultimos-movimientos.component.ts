import { Component, OnInit, ViewChild } from '@angular/core';
import { Cuenta } from 'src/app/models/cuenta';
import { MonedasDeCuenta } from 'src/app/models/monedasDeCuenta';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { LoginService } from 'src/app/services/login.service';
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
  dato : any;
    
  constructor(private myService: CuentaService, private comunicacion:ComunicacionService, private authService: LoginService) 
  {
   
  }

  ngOnChanges():void{
    location.reload();
    this.getCuenta();
    this.getBilletera();
    this.getMovimientos();
  }
 

  ngOnInit(): void {
    console.log(this.authService.usuarioAutenticado.idCuenta)
    this.getCuenta();
    this.getBilletera();
    this.getMovimientos();
    
  }

  getAll(){
    //this.myService.obtenerUltimosMovimientos().subscribe((data=>{this.movimientos = data}))
  }

  getCuenta(){
    this.user= this.comunicacion.getUser();
    if(this.authService.usuarioAutenticado.idCuenta != null){
      this.myService.obtenerCuenta(this.authService.usuarioAutenticado.idCuenta).subscribe({
        next: (data) => {
          
          this.cuenta=data;
        }
      })
    }
    
  }

  getBilletera(){
    this.user= this.comunicacion.getUser();
    //console.log(this.user);
   // if(this.authService.usuarioAutenticado.idCuenta == null){
   //   this.billetera=[];
   // }
    
      this.myService.obtenerBilletera(this.authService.usuarioAutenticado.idCuenta).subscribe(data=>{
       
        this.billetera=data
      })
      //console.log(this.billetera)
      
    }
    

    getMovimientos(){
      this.user= this.comunicacion.getUser();
      this.myService.obtenerMovimientos(this.authService.usuarioAutenticado.idCuenta).subscribe(data =>{this.movimientos = data, console.log(this.movimientos)} );
      }
    
    
    

}
