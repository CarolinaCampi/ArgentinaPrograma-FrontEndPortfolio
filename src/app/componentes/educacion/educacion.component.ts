import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionFormalList: any;
  cursoList: any;
  empresaInstitucionList:any;

  constructor(private datosPortfolio: PortfolioService) { }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatos("educacion_formal").subscribe(data => {
      for (let educacion of data) {
        educacion.fecha_inicio = this.convertirFechaAMesAno(educacion.fecha_inicio);
        educacion.fecha_fin = this.convertirFechaAMesAno(educacion.fecha_fin);
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
        this.educacionFormalList = data;
        //console.log(this.educacionFormalList);
      });

    });

    this.datosPortfolio.obtenerDatos("curso").subscribe(data => {
      for (let curso of data) {
        curso.fecha_inicio = this.convertirFechaAMesAno(curso.fecha_inicio);
        curso.fecha_fin = this.convertirFechaAMesAno(curso.fecha_fin);
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
        this.cursoList = data;
        // console.log(this.cursoList);
      });

    });

  }

  convertirFechaAMesAno(fecha:string): string {
    const date = new Date(fecha); // create a new Date object with fecha
    const options: any = { year: 'numeric', month: 'long' }; // options for formatting the date
    const formattedDate = date.toLocaleDateString('es-ES', options); // format the date to "Month Year" format

    return formattedDate;// output format: "novembre de 2023"
  }

}
