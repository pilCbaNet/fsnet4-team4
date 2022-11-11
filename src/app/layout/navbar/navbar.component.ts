import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  autenticado=false;
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
  getAutenticacion(e:any){
    console.log(e);
    this.autenticado = e;
  }

  cerrarSesion(){
    this.autenticado=false;
    this.router.navigate(['inicio']);
  }
}
