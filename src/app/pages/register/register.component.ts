import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
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
}
