import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IniciarSesionComponent } from '../componentes/iniciar-sesion/iniciar-sesion.component';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  url="http://localhost:8080/authenticate";
  currentUserSubject: BehaviorSubject<any>;
  
  constructor(private http: HttpClient) {
    console.log("El servicio de autenticacion esta corriendo");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'));
   }

   iniciarSesion (credenciales:any): Observable<any>{
    return this.http.post(this.url, credenciales).pipe(map(data=>{
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }))
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
