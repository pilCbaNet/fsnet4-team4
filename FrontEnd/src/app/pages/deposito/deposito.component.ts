import { Component, OnInit } from '@angular/core';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cuentas } from 'src/app/models/cuentas';
import { CuentaService } from 'src/app/services/cuenta.service';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})

export class DepositoComponent implements OnInit {
  form: FormGroup;
  constructor(private myService:CuentaService,private formBuilder: FormBuilder, private service:CotizacionesService) {
    this.form = this.formBuilder.group({
      moneda: ['', [Validators.required,]],
      unidades: ['', [Validators.required]],
    });
  }
  
  monedas:any;
  unidades:number = 0;
  seleccionado: any;
  precio: number = 0;
  cerrar:boolean = false;
  ngOnInit(): void {
    this.getAll();
    this.cerrar = false;
  }

  ShowSelected(){
    this.precio = this.seleccionado.cotizacion;
  }

  getAll(){
    this.service.obtenerMonedas().subscribe((data:any)=>{this.monedas = data})
  }

  depositar(){
    if(this.form.valid){
      let operacion:string = "Deposito"
      let moneda:string = this.seleccionado.nombre;
      let unidades:number = this.unidades;
      let importeArs:number = this.precio*this.unidades;
      let fecha:string= new Date().toLocaleString();
      
      let cuenta: Cuentas= new Cuentas(operacion,moneda,unidades,importeArs,fecha)
      this.myService.depositar(cuenta).subscribe();
      
    }
    else{
      alert("Complete todos los campos!")
    }
  }

  generarHash():number{
    return Math.floor(Math.random()*1000000)
  }
  
  get Unidades(){
    return this.form.get("unidades")
  }
}
