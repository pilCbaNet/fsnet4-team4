import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {}

  login(login:Login):Observable<any>{

    return this.http.post<any>('https://localhost:7245/api/Login/',login);

  }
  
}
