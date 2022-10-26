import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private myService: RegisterService, private router:Router) {
    this.form= this.formBuilder.group(
      {
        nombre:['', [Validators.required]] ,
        dni:['', [Validators.required]],
        password1:['',[Validators.required]],
        password2:['',[Validators.required]],
        email:['', [Validators.required, Validators.email]]   
      })
   }

  ngOnInit(): void {
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

      let register: Register = new Register(email,password1,password2,dni,nombre);
      this.myService.register(register).subscribe(respuesta=>{
      this.router.navigate(['servicios']);
      })
      
    }
  }

}
