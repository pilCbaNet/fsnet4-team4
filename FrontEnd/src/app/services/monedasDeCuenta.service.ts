import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operaciones} from '../models/Operaciones';
import { MonedasDeCuenta} from '../models/monedasDeCuenta';

@Injectable({
  providedIn: 'root'
})
export class MonedasDeCuentaService {

  constructor(private http:HttpClient) { }

  actualizarBilletera(id:number,cuenta:MonedasDeCuenta):Observable<any>
  {
   return this.http.post<any>('https://localhost:7245/api/MonedasDeCuenta/'+id,cuenta);
  }

 
}

