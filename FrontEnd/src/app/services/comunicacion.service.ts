import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  
  constructor() { }
  usua:any;
  setUser(user:usuario){
    this.usua=user;
  }

  getUser(){
    return this.usua;
  }

}
