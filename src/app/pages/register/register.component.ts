import { Component, OnInit } from '@angular/core';
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
  constructor(private formBuilder: FormBuilder, private myService: RegisterService, private router:Router) {
    this.form = formBuilder.group(
      {
        nombre:['', [Validators.required]] ,
        dni:['', [Validators.required]],
        nacimiento:['', [Validators.required]],
        email:['', [Validators.required, Validators.email]],
        password1:['',[Validators.required]],
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
  }

  // get Password1()
  // {
  //   return this.form.get("password1");
  // }
  // get Password2()
  // {
  //   return this.form.get("password2");
  // }

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
      let password2:string = this.form.get('password2')?.value;
      let dni:number = this.form.get('dni')?.value;
      let nombre:string = this.form.get('nombre')?.value;
      let nacimiento: Date = this.form.get('nacimiento')?.value;

      let register: Register = new Register(email,password1,password2,dni,nombre,nacimiento);
      this.myService.register(register).subscribe(respuesta=>{
      this.router.navigate(['ultimos-movimientos']);
      })

    }
  }

}
