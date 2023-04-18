import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit{
  educacionFormalList:any;
  cursosList:any;
  
  hola: string = "hola";

  constructor(private datosPortfolio:PortfolioService){ }


  ngOnInit(): void {
    // this.datosPortfolio.obtenerDatos("educacion").subscribe(data => {
    //   console.log(data);
    //   this.educacionFormalList = data.educacion.educacionFormal;
    //   this.cursosList = data.educacion.cursos;
    // });

    this.datosPortfolio.obtenerDatosJSON().subscribe(data => {
      console.log("Esta es la data dentro del educacion: " + data);
      console.log(data);
      this.educacionFormalList = data.educacion.educacionFormal;
      this.cursosList = data.educacion.cursos;
    });
  }

}
