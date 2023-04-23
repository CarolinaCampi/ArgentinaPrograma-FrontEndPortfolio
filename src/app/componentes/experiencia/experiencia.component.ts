import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit{
  experienciaList:any;

  empresaInstitucionList: any;
  
  constructor(private datosPortfolio:PortfolioService){ }
  
  convertirFechaAMesAno(fecha:string): string {
    const date = new Date(fecha); // create a new Date object with fecha
    const options: any = { year: 'numeric', month: 'long' }; // options for formatting the date
    const formattedDate = date.toLocaleDateString('es-ES', options); // format the date to "Month Year" format

    return formattedDate;// output format: "novembre de 2023"
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos("experiencia").subscribe(data => {
      console.log(data);
      for (let experiencia of data){
        experiencia.fecha_inicio = this.convertirFechaAMesAno(experiencia.fecha_inicio);
        experiencia.fecha_fin = this.convertirFechaAMesAno(experiencia.fecha_fin);
      }
      this.experienciaList = data;
    });

    this.datosPortfolio.obtenerDatos("empresa_institucion").subscribe(data => {
      console.log(data);
      this.empresaInstitucionList = data;
    });

    

    // this.datosPortfolio.obtenerDatosJSON().subscribe(data => {
    //   console.log(data);
    //   this.experienciaList = data.experiencia;
    // });
  }
}
