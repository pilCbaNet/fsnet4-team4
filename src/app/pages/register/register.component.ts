import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
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
  autenticado: boolean= false;
  @Output() evento = new EventEmitter<boolean>();
  constructor(private formBuilder: FormBuilder, private myService: RegisterService, private router:Router) {
    this.form = formBuilder.group(
      {
        nombre:['', [Validators.required]] ,
        dni:['', [Validators.required]],
        nacimiento:['', [Validators.required]],
        email:['', [Validators.required, Validators.email]],
        password1:['',[Validators.required, Validators.minLength(6)]],
        confirm_password2:['',[Validators.required]],
      },
    {
      validator:ConfirmedValidator('password1', 'confirm_password2')
    })
   }
   SaveForm(){

   }
   get f ()
   {
    return this.form.controls;
   }

  ngOnInit(): void {
    this.fechaMaxima();
  }

  get Password1()
   {
     return this.form.get("password1");
  }
  get Password2()
   {
     return this.form.get("password2");
  }

  get Mail()
  {
   return this.form.get("email");
  }

  get Nacimiento()
  {
    return this.form.get("nacimiento");
  }
  get Nombre()
  {
    return this.form.get("nombre");
  }
  get Dni()
  {
   return this.form.get("dni");
  }

  register(){
    if(this.form.valid){
      let email:string = this.form.get('email')?.value;
      let password1:string = this.form.get('password1')?.value;
      let dni:number = this.form.get('dni')?.value;
      let nombre:string = this.form.get('nombre')?.value;
      let nacimiento: Date = this.form.get('nacimiento')?.value;
      let register: Register = new Register(email,password1,dni,nombre,nacimiento);
      this.myService.register(register).subscribe(respuesta=>{
      this.router.navigate(['ultimos-movimientos']);
      this.autenticado=true;
      this.evento.emit(this.autenticado);
      })

    }
  }

  fechaMaxima(){
    let today_date = new Date();
    let today_year = today_date.getFullYear();
    let today_month = today_date.getMonth();
    let today_day = today_date.getDate();
    let dia:string;
    if (today_day <10){
      dia = '0' + today_day.toString();
    }
    else{
      dia = today_day.toString();
    }
    let año = today_year - 18
    this.maxDate =   año.toString()+'-'+today_month.toString()+'-'+ dia
  }

}
