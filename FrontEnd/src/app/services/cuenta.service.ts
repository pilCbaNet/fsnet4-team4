import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuenta } from '../models/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http:HttpClient) { }
  obtenerUltimosMovimientos():Observable<any>
  {
    return this.http.get('http://localhost:3000/cuenta');
  }
  depositar(cuenta:Cuenta):Observable<any>{

    return this.http.post('http://localhost:3000/cuenta',cuenta);

  }
}
