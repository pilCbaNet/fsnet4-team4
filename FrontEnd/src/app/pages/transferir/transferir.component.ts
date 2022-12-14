import { Component, OnInit } from '@angular/core';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Operaciones} from 'src/app/models/Operaciones';
import { Cuenta } from 'src/app/models/cuenta';
import { CuentaService } from 'src/app/services/cuenta.service';
import { Router } from '@angular/router';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { LoginService } from 'src/app/services/login.service';
import { MonedasDeCuentaService } from 'src/app/services/monedasDeCuenta.service';
import { MonedasDeCuenta } from 'src/app/models/monedasDeCuenta';

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
  constructor(private myService:CuentaService,private formBuilder: FormBuilder, private service:CotizacionesService,private router:Router,private monedasService:MonedasDeCuentaService, private comunicacion:ComunicacionService,private authService: LoginService) {
    this.form = this.formBuilder.group({
      moneda: ['', [Validators.required,]],
      unidades: ['', [Validators.required,Validators.min(0.001)]],
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
      let unidades:number = - this.unidades;
      let monto:number = - this.precio*this.unidades;
      let fecha:string= new Date().toLocaleString();
      let operaciones: Operaciones= new Operaciones(moneda,unidades,monto,operacion,this.authService.usuarioAutenticado.idCuenta);
      console.log(operaciones);
      
      let monedasDeCuenta: MonedasDeCuenta = new MonedasDeCuenta(this.authService.usuarioAutenticado.idCuenta,moneda,unidades,monto);
      console.log(monedasDeCuenta);
      let tieneSaldo: boolean = false;
      this.monedasService.actualizarBilletera(2,monedasDeCuenta).subscribe(data =>{if( data != null){this.myService.depositar(operaciones).subscribe(data =>{
        let cuenta:Cuenta = new Cuenta(0,monto);
        this.myService.actualizarCuenta(this.authService.usuarioAutenticado.idCuenta,cuenta).subscribe(
          data =>{this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.router.navigate(["ultimos-movimientos"])); }
        );
        
      });
        }
      if(data == null){alert("Verifique Si tiene saldo y monedas para transferir")}
      });
      
      
      
      
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