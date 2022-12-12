import { Component, OnInit } from '@angular/core';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Operaciones} from 'src/app/models/Operaciones';
import { Cuenta } from 'src/app/models/cuenta';
import { CuentaService } from 'src/app/services/cuenta.service';
import { Router } from '@angular/router';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

interface Moneda {
  idMoneda:number;
  nombre: string;
  precioXunidad: number;
}

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.css']
})

export class TransferirComponent implements OnInit {

  form: FormGroup;
  constructor(private myService:CuentaService,private formBuilder: FormBuilder, private service:CotizacionesService,private router:Router, private comunicacion:ComunicacionService) {
    this.form = this.formBuilder.group({
      moneda: ['', [Validators.required,]],
      unidades: ['', [Validators.required]],
    });
  }
  
  monedas: Moneda[] = []
  unidades:number = 0;
  seleccionado: any;
  precio: number = 0;
  cerrar:boolean = false;
  ngOnInit(): void {
    this.getAll();
    this.cerrar = false;
  }

  ShowSelected(){
    this.precio = this.seleccionado.precioXunidad;
    console.log(this.precio);
  }

  getAll(){
    
    this.service.obtenerMonedas().subscribe((data:any)=>{this.monedas = data})
  }

  retirar(){
    let user= this.comunicacion.getUser();
    if(this.form.valid){
      let operacion:number= 2;
      let saldo:number = this.precio*this.unidades ;
      let moneda:number = this.seleccionado.idMoneda;
      let unidades:number = this.unidades;
      let monto:number = this.precio*this.unidades;
      let fecha:string= new Date().toLocaleString();
      let operaciones: Operaciones= new Operaciones(moneda,unidades,monto,operacion,user.idCuenta);
      console.log(operaciones);
      this.myService.depositar(operaciones).subscribe();
    }
    else{
      alert("Complete todos los campos!")
    }
  }

  refresh(): void { window.location.reload(); }

  generarHash():number{
    return Math.floor(Math.random()*1000000)
  }
  
  get Unidades(){
    return this.form.get("unidades")
  }
}