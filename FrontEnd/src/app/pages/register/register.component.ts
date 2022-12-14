import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cuenta } from 'src/app/models/cuenta';
import { Login } from 'src/app/models/login';
import { Register } from 'src/app/models/register';
import { usuario } from 'src/app/models/usuario';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from 'src/app/services/register.service';
import { ConfirmedValidator } from './confirmed.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  minDate = "1900-01-01";
  maxDate = "";
  autenticado: boolean = false;
  estaAutenticado:boolean=false;
  [x: string]: any;

  @Output() evento = new EventEmitter<boolean>();
  constructor(private formBuilder: FormBuilder, private myService: RegisterService, private router: Router, private cuentaService:CuentaService, private comunicacion:ComunicacionService,private service:LoginService) {
    this.form = formBuilder.group(
      {
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        dni: ['', [Validators.required]],
        nacimiento: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password1: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password2: ['', [Validators.required]],
      },
      {
        validator: ConfirmedValidator('password1', 'confirm_password2')
      })
  }
  SaveForm() {

  }
  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.fechaMaxima();
    //console.log((this.generarCBU()))
    this.service.estaAutenticado.subscribe(res=>( this.estaAutenticado=res));
    
  }

  get Password1() {
    return this.form.get("password1");
  }
  get Password2() {
    return this.form.get("password2");
  }

  get Mail() {
    return this.form.get("email");
  }

  get Nacimiento() {
    return this.form.get("nacimiento");
  }
  get Nombre() {
    return this.form.get("nombre");
  }
  get Apellido() {
    return this.form.get("apellido");
  }
  get Dni() {
    return this.form.get("dni");
  }

  register() {
    if (this.form.valid) {
      let email: string = this.form.get('email')?.value;
      let password1: string = this.form.get('password1')?.value;
      let dni: number = this.form.get('dni')?.value;
      let nombre: string = this.form.get('nombre')?.value;
      let nacimiento: Date = this.form.get('nacimiento')?.value;
      let apellido: string = this.form.get('apellido')?.value;

      let cuenta: Cuenta = new Cuenta(this.generarCBU(),0)
      console.log(cuenta);
      let idC:number = 0;
      this.cuentaService.crearCuenta(cuenta).subscribe({next:(data)=> {console.log(data), idC = data.idCuenta , console.log(idC);
        let register: Register = new Register(nombre, apellido, email, password1, dni, nacimiento,idC);
        this.myService.register(register).subscribe({
          next: (data) => {
            console.log(data);
            this.form.reset();
            this.autenticado = true;
            this.evento.emit(this.autenticado);
            let user: usuario = new usuario(data.idUsuario, data.nombre,data.apellido,data.email,data.password,data.dni,data.fechaNacimiento,data.fechaAlta,data.idCuenta);
            this.comunicacion.setUser(user);
            //this.router.navigate(['ultimos-movimientos']);
            localStorage.clear();
            let login: Login = new Login(email,password1)
            this.service.login(login).subscribe({
              next:(data) => {
                console.log(data);
                if (data!= null){
                  
                  this.usuari=data;
                  console.log(this.usuari)
                  this.form.reset();
                  this.autenticado = true;
                  this.evento.emit(this.autenticado);
                  this.router.navigate(['ultimos-movimientos']);
                  
                  
          }
            
  
          }
            
        }
        )
        
      }
      })
    }
      })}}

  fechaMaxima() {
    let today_date = new Date();
    let today_year = today_date.getFullYear();
    let today_month = today_date.getMonth();
    let today_day = today_date.getDate();
    let dia: string;
    if (today_day < 10) {
      dia = '0' + today_day.toString();
    }
    else {
      dia = today_day.toString();
    }
    let a??o = today_year - 18
    this.maxDate = a??o.toString() + '-' + today_month.toString() + '-' + dia
  }

  generarCBU(){
    return Math.floor(Math.random()*1000000000)
  }
}
