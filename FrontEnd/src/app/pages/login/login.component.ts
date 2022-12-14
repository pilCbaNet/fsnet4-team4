import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { LoginService } from 'src/app/services/login.service';
import { usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  autenticado: boolean= false;
  estaAutenticado:boolean=false;
  [x: string]: any;
  @Output() evento = new EventEmitter<boolean>();
  constructor(private formBuilder: FormBuilder, private myService:LoginService,private router:Router, private comunicacion:ComunicacionService,private service:LoginService) {
    this.form = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.service.estaAutenticado.subscribe(res=>( this.estaAutenticado=res));
  }
  get Mail()
  {
   return this.form.get("mail");
  }
  get Password()
  {
    return this.form.get("password");
  }

  login(){
    if(this.form.valid){
      let email:string = this.form.get('mail')?.value;
      let password:string = this.form.get('password')?.value;
      let login: Login = new Login(email,password)
      console.log(login);
      
      this.myService.login(login).subscribe({
        next:(data) => {
          console.log(data);
          if (data!= null){
            this.usuario=data;
            this.form.reset();
            this.autenticado = true;
            this.evento.emit(this.autenticado);
            this.router.navigate(['ultimos-movimientos']);
            let user = new usuario(data.idUsuario, data.nombre,data.apellido,data.email,data.password,data.dni,data.fechaNacimiento,data.fechaAlta,data.idCuenta)
            console.log(user)
            this.comunicacion.setUser(user);
          }
          else{
            this.autenticado=false;
            this.form.reset();
            alert("Verifique sus credenciales");
            this.evento.emit(this.autenticado);
          }
        }
      }
       )
    }
    
  }



}
