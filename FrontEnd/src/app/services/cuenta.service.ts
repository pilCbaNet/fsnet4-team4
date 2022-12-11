import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuentas } from '../models/cuentas';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http:HttpClient) { }

  obtenerCuenta(id: any):Observable<any>
  {
    return this.http.get('https://localhost:7245/api/Cuentas/'+id);
  }
  obtenerBilletera(id:any):Observable<any>
  {
   return this.http.get('https://localhost:7245/api/MonedasDeCuenta/'+id);
  }

  obtenerMovimientos(id:any):Observable<any>
  {
   return this.http.get('https://localhost:7245/api/Operaciones/'+id);
  }

  depositar(cuenta:Cuentas):Observable<any>{

    return this.http.post('http://localhost:3000/cuenta',cuenta);

  }
}
