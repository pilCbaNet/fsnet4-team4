import { Component, OnInit } from '@angular/core';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Operaciones } from 'src/app/models/Operaciones';
import { CuentaService } from 'src/app/services/cuenta.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { MonedasDeCuentaService } from 'src/app/services/monedasDeCuenta.service';
import { MonedasDeCuenta } from 'src/app/models/monedasDeCuenta';
import { Cuenta } from 'src/app/models/cuenta';


@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})

export class DepositoComponent implements OnInit {
  form: FormGroup;
  constructor(private myService:CuentaService,private formBuilder: FormBuilder, private service:CotizacionesService, private comunicacion:ComunicacionService, private monedasService:MonedasDeCuentaService) {
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
    this.precio = this.seleccionado.precioXunidad;
  }

  getAll(){
    this.service.obtenerMonedas().subscribe((data:any)=>{this.monedas = data})
  }

  depositar(){
    let user= this.comunicacion.getUser();
    if(this.form.valid){
      let operacion:number= 1;
      let saldo:number = this.precio*this.unidades ;
      let moneda:number = this.seleccionado.idMoneda;
      let unidades:number = this.unidades;
      let monto:number = this.precio*this.unidades;
      let fecha:string= new Date().toLocaleString();
      let operaciones: Operaciones= new Operaciones(moneda,unidades,monto,operacion,user.idCuenta);
      console.log(operaciones);
      this.myService.depositar(operaciones).subscribe();
      let monedasDeCuenta: MonedasDeCuenta = new MonedasDeCuenta(user.idCuenta,moneda,unidades,monto);
      console.log(monedasDeCuenta);
      this.monedasService.actualizarBilletera(monedasDeCuenta).subscribe();
      let cuenta:Cuenta = new Cuenta(0,monto);
      this.myService.actualizarCuenta(user.idCuenta,cuenta).subscribe();
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
