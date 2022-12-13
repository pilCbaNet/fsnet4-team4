import { Component, OnInit } from '@angular/core';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Operaciones } from 'src/app/models/Operaciones';
import { CuentaService } from 'src/app/services/cuenta.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { MonedasDeCuentaService } from 'src/app/services/monedasDeCuenta.service';
import { MonedasDeCuenta } from 'src/app/models/monedasDeCuenta';
import { Cuenta } from 'src/app/models/cuenta';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})

export class DepositoComponent implements OnInit {
  form: FormGroup;
  constructor(private router:Router,private myService:CuentaService,private formBuilder: FormBuilder, private service:CotizacionesService, private comunicacion:ComunicacionService, private monedasService:MonedasDeCuentaService, private authService: LoginService) {
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
    //let user= this.comunicacion.getUser();
    if(this.form.valid){
      let operacion:number= 1;
      let saldo:number = this.precio*this.unidades ;
      let moneda:number = this.seleccionado.idMoneda;
      let unidades:number = this.unidades;
      let monto:number = this.precio*this.unidades;
      let fecha:string= new Date().toLocaleString();
      let operaciones: Operaciones= new Operaciones(moneda,unidades,monto,operacion,this.authService.usuarioAutenticado.idCuenta);
      console.log(operaciones);
      this.myService.depositar(operaciones).subscribe();
      let monedasDeCuenta: MonedasDeCuenta = new MonedasDeCuenta(this.authService.usuarioAutenticado.idCuenta,moneda,unidades,monto);
      console.log(monedasDeCuenta);
      this.monedasService.actualizarBilletera(1,monedasDeCuenta).subscribe();
      let cuenta:Cuenta = new Cuenta(0,monto);
      this.myService.actualizarCuenta(this.authService.usuarioAutenticado.idCuenta,cuenta).subscribe();
      


    }
    else{
      alert("Complete todos los campos!")
    }
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.router.navigate(["ultimos-movimientos"]));
  }

  generarHash():number{
    return Math.floor(Math.random()*1000000)
  }
  
  get Unidades(){
    return this.form.get("unidades")
  }
}
