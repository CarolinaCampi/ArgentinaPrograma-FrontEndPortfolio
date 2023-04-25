import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experienciaList: any;

  constructor(private datosPortfolio: PortfolioService) { }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatos("experiencia").subscribe(data => {
      for (let experiencia of data) {
        experiencia.fecha_inicio = this.convertirFechaAMesAno(experiencia.fecha_inicio);
        experiencia.fecha_fin = this.convertirFechaAMesAno(experiencia.fecha_fin);
      }
      this.datosPortfolio.obtenerDatos("empresa_institucion").subscribe(dataEmpInst => {
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < dataEmpInst.length; j++) {
            if (data[i].empresa_institucion_id == dataEmpInst[j].id) {
              data[i]["empresa_institucion_nombre"] = dataEmpInst[j].nombre;
              data[i]["empresa_institucion_url_logo"] = dataEmpInst[j].url_logo;
              data[i]["empresa_institucion_alt_text_logo"] = dataEmpInst[j].alt_text_logo;
            }
          }
        }
        this.experienciaList = data;
        //console.log(this.experienciaList);
      });

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
