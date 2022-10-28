import { Component, OnInit } from '@angular/core';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coin } from 'src/app/models/coin';
import { Cuenta } from 'src/app/models/cuenta';
import { CuentaService } from 'src/app/services/cuenta.service';
import { UltimosMovimientosComponent } from '../ultimos-movimientos/ultimos-movimientos.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.css']
})
export class TransferirComponent implements OnInit {

  form: FormGroup;
  constructor(private myService:CuentaService,private formBuilder: FormBuilder, private service:CotizacionesService,private router:Router) {
    this.form = this.formBuilder.group({
      moneda: ['', [Validators.required,]],
      unidades: ['', [Validators.required]],
    });
   }
  
  cotizaciones:any;
  unidades:number = 0;
  seleccionado: any;
  precio: number = 0;
  cerrar:boolean = false;
  ngOnInit(): void {
    this.getAll();
    this.cerrar = false;
  }

 
ShowSelected()
{
  console.log(this.seleccionado.name)
  console.log(this.seleccionado.current_price)
  this.precio = this.seleccionado.current_price;

}

  getAll(){
    this.service.obtenerMonedas().subscribe((data:any)=>{this.cotizaciones = data})
  }

  retirar(){
    if(this.form.valid){
      let operacion:string = "Extraccion"
      let moneda:string = this.seleccionado.name;
      let unidades:number = this.unidades;
      let importeArs:number = this.precio*this.unidades;
      let fecha:string= new Date().toLocaleString();
      let hashOperacion = this.generarHash();
      let cuenta: Cuenta= new Cuenta(operacion,moneda,unidades,importeArs,fecha,hashOperacion)
      this.myService.depositar(cuenta).subscribe();
      
      
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