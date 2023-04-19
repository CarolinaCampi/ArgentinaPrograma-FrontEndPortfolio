import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Event } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EducacionComponent implements OnInit {
  educacionFormalList: any;
  cursosList: any;

  //Para prueba
  @Input() hola: string = "prueba";

  constructor(private datosPortfolio: PortfolioService, private ruta: Router, private http:HttpClient) { }

  obtenerDatosJSON():Observable<any>{
    return this.http.get('./assets/data/data.json');
  }

  ngOnInit(): void {
    console.log("Entramos a OnInit de educacion");

    this.datosPortfolio.obtenerDatosJSON().subscribe(data => {
      //console.log("Esta es la data dentro del educacion: " + data);
      //console.log(data);
      this.educacionFormalList = data.educacion.educacionFormal;
      this.cursosList = data.educacion.cursos;
    })

      // this.datosPortfolio.obtenerDatos("educacion").subscribe(data => {
      //   console.log(data);
      //   this.educacionFormalList = data.educacion.educacionFormal;
      //   this.cursosList = data.educacion.cursos;
      // });

  }

}
