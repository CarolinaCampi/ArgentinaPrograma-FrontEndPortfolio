import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  url:string="http://localhost:8080/";

  constructor(private http:HttpClient) {  }
  
  obtenerDatosJSON():Observable<any>{
    return this.http.get('./assets/data/data.json');
  }
  
  obtenerDatos(sector: string):Observable<any>{
    return this.http.get(this.url + sector);
  }


}
