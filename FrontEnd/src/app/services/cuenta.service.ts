import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operaciones} from '../models/Operaciones';
import { Cuenta } from '../models/cuenta';

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

  depositar(cuenta:Operaciones):Observable<any>{

    return this.http.post('https://localhost:7245/api/Operaciones/', cuenta)
    
  }

  actualizarCuenta(id:number,cuenta:Cuenta):Observable<any>{
    return this.http.put('https://localhost:7245/api/Cuentas/' + id, cuenta)
  }

  crearCuenta(cuenta:Cuenta):Observable<any>{
    return this.http.post<any>('https://localhost:7245/api/Cuentas',cuenta)
  }
}
