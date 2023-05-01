import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  url:string="http://localhost:8080/";

  constructor(private http:HttpClient) {  }
    
  obtenerDatos(entity: string):Observable<any>{
    return this.http.get(this.url + entity);
  }

  postearDatos(entity: string, body:any):Observable<any>{
    return this.http.post(this.url + entity, body);
  }

  modificarDatos(entity:string, body:any):Observable<any>{
    return this.http.put(this.url + entity, body);
  }

  borrarDatos(entity:string, id:number):Observable<any>{
    return this.http.delete(this.url + entity + '/' + id);
  }

}
