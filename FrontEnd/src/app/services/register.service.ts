import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) {
      
   }
  register(register:Register):Observable<any>{

    return this.http.post<any>('https://localhost:7245/api/Usuarios/',register);

  }
}
