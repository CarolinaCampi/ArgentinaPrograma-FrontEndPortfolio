import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  // url="http://localhost:8080/authenticate";
  url:string = "https://argentinaprograma-backendportfolio.onrender.com/authenticate";
  currentUserSubject: BehaviorSubject<any>;
  
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'));
   }

   iniciarSesion (credenciales:any): Observable<any>{
    return this.http.post(this.url, credenciales).pipe(
      map(data => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);
        return data;
      }),
    catchError(err => {
        return of("");
      })
    )
   }

   get UsuarioAutenticado(){
    return this.currentUserSubject.value;
   }

   logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
  }
   
   isLoggedIn() {
    if (sessionStorage.getItem('currentUser')) {
      return true;
    }
    else {
      return false;
    }
  }
}
