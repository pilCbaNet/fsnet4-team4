import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private loginService:LoginService
      ) { }

      canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable <boolean> {
         return this.loginService.estaAutenticado.pipe(take (1),
         map((isLogged:boolean)=>isLogged));
      }
    }
     
  

