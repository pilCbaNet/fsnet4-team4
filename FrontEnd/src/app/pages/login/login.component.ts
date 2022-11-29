import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  autenticado: boolean= false;
  @Output() evento = new EventEmitter<boolean>();
  constructor(private formBuilder: FormBuilder, private myService:LoginService,private router:Router) {
    this.form = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
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
      this.myService.login(login).subscribe(respuesta=>{
      this.router.navigate(['ultimos-movimientos']);
      this.autenticado = true;
      this.evento.emit(this.autenticado);
      this.form.reset()
      })
    }
    
  }



}
