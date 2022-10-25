import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  public modalTitle:string= "";
  public login:boolean = false;
  public register:boolean = false;

  mostrarLogin(){
    this.modalTitle = "Iniciar Sesion";
    this.login = true;
  }


  mostrarRegistro(){
    this.modalTitle = "Registrarse";
    this.register = true;
  }

  reiniciarVariableModal(){
    this.register = false;
    this.login = false;
  }
}
