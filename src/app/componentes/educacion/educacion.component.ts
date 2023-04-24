import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Event } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionFormalList: any;
  cursosList: any;
  empresaInstitucionList:any;

  constructor(private datosPortfolio: PortfolioService) { }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatosJSON().subscribe(data => {
      //  this.educacionFormalList = data.educacion.educacionFormal;
      this.cursosList = data.educacion.cursos;
    })

      this.datosPortfolio.obtenerDatos("educacion_formal").subscribe(data => {
        console.log(data);
        for (let educacionFormal of data){
          educacionFormal.fecha_inicio = this.convertirFechaAMesAno(educacionFormal.fecha_inicio);
          educacionFormal.fecha_fin = this.convertirFechaAMesAno(educacionFormal.fecha_fin);
        }
        this.educacionFormalList = data;
       });

      // this.datosPortfolio.obtenerDatos("curso").subscribe(data => {
      //   console.log(data);
      //   this.cursosList = data;
      // });

      this.datosPortfolio.obtenerDatos("empresa_institucion").subscribe(data => {
        console.log(data);
        this.empresaInstitucionList = data;
      });

  }

  convertirFechaAMesAno(fecha:string): string {
    const date = new Date(fecha); // create a new Date object with fecha
    const options: any = { year: 'numeric', month: 'long' }; // options for formatting the date
    const formattedDate = date.toLocaleDateString('es-ES', options); // format the date to "Month Year" format

    return formattedDate;// output format: "novembre de 2023"
  }

}
