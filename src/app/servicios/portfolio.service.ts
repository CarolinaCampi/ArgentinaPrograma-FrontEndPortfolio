import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  url:string="http://localhost:8080/";

  constructor(private http:HttpClient) {  }
  

  
  obtenerDatos(sector: string):Observable<any>{
    return this.http.get(this.url + sector);
  }

  postearDatos(sector: string, body:any):Observable<any>{
    return this.http.post(this.url + sector, body);
  }

  modificarDatos(sector:string, body:any):Observable<any>{
    return this.http.put(this.url + sector, body);
  }

}
