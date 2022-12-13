import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuario } from '../models/usuario';
import { Login } from '../models/login';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedIn= new BehaviorSubject<boolean>(false);
  currentUserSubject: BehaviorSubject<usuario>;
  currentUser: Observable<usuario>;

  constructor(private http:HttpClient,private router:Router) {
    this.currentUserSubject = new BehaviorSubject<usuario>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(login:Login):Observable<any>{

    return this.http.post<any>('https://localhost:7245/api/Login/',login).pipe(map(data => {
      localStorage.setItem('currentUser', JSON.stringify(data ));
      this.currentUserSubject.next(data);
      this.loggedIn.next(true);
      console.log(data);
      
      return data;
    }));

    

  }

  logout(): void{
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    localStorage.clear();
    
  }

  get usuarioAutenticado(): usuario {
    return this.currentUserSubject.value;
  }

  get estaAutenticado(): Observable<boolean> {
    let user = localStorage.getItem('currentUser');
    if( user == null){
      this.router.navigate(['inicio'])
    }
    return this.loggedIn.asObservable();
  }
  
}
