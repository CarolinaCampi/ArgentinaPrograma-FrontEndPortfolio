import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit{
  proyectosList:any;
  
  constructor(private datosPortfolio:PortfolioService){ }
  

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos("proyecto").subscribe(data => {
      console.log(data);
      for (let proyecto of data) {
        proyecto.fecha_inicio = this.convertirFechaAMesAno(proyecto.fecha_inicio);
        proyecto.fecha_fin = this.convertirFechaAMesAno(proyecto.fecha_fin);
      }
      this.proyectosList = data;
    });


  }

  convertirFechaAMesAno(fecha: string): string {
    if (!fecha){
      return "presente";
    }
    const date = new Date(fecha); // create a new Date object with fecha
    const options: any = { year: 'numeric', month: 'long' }; // options for formatting the date
    const formattedDate = date.toLocaleDateString('es-ES', options); // format the date to "Month Year" format

    return formattedDate;// output format: "novembre de 2023"
  }

}
