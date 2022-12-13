import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, private service:LoginService) { }

  autenticado=false;
  estaAutenticado:boolean=false;
  dato = localStorage.getItem('currentUser');
  
  ngOnInit(): void {
    console.log(this.dato );
    this.service.estaAutenticado.subscribe(res=>( this.estaAutenticado=res));
    if(this.dato != null){
      this.estaAutenticado=true;
     }
    
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
    this.reiniciarVariableModal();
  }

  cerrarSesion(){
    this.autenticado=false;
    this.register = false;
    this.login = false;
    this.router.navigate(['inicio']);
    this.service.logout();
    localStorage.clear();
  }
}
