import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experienciaList: any;
  empInstList: any;
  rawDataExperiencia: any;

  constructor(private datosPortfolio: PortfolioService, public autenticacionServicio: AutenticacionService) { }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatos("experiencia").subscribe(data => {
      this.rawDataExperiencia = JSON.parse(JSON.stringify(data));

      for (let experiencia of data) {
        experiencia.fecha_inicio = this.convertirFechaAMesAno(experiencia.fecha_inicio);
        experiencia.fecha_fin = this.convertirFechaAMesAno(experiencia.fecha_fin);
      }
      this.datosPortfolio.obtenerDatos("empresa_institucion").subscribe(dataEmpInst => {
        this.empInstList = dataEmpInst;
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
      });

    });

  }

  convertirFechaAMesAno(fecha: any): string {
    if (!fecha) {
      return "presente";
    }
    const date = new Date(fecha); // create a new Date object with fecha
    const options: any = { year: 'numeric', month: 'long' }; // options for formatting the date
    const formattedDate = date.toLocaleDateString('es-ES', options); // format the date to "Month Year" format

    return formattedDate;// output format: "novembre de 2023"
  }

  // Changes the display class of an element with a specific id
  mostrarById(id: string) {
    document.getElementById(id)!.classList.remove('d-none');
    document.getElementById(id)!.classList.add('d-inline');
  }

  // Changes the display class of an element with a specific id
  ocultarById(id: string) {
    document.getElementById(id)!.classList.remove('d-inline');
    document.getElementById(id)!.classList.add('d-none');
  }

  // Changes the input to disabled or enabled depending on the event
  onCheckboxTrabajoActualChange(event: Event, dataToUpdate: any, id: string) {
    const isChecked = (<HTMLInputElement>event.target).checked;

    if (isChecked) {
      // Checkbox is checked

      // update the UI
      dataToUpdate['fecha_fin'] = this.convertirFechaAMesAno(null);
      dataToUpdate['es_trabajo_actual'] = true;
      document.getElementById(id)!.classList.remove('d-inline');
      document.getElementById(id)!.classList.add('d-none');

      //update DB
      for (let i = 0; i < this.rawDataExperiencia.length; i++) {
        if (this.rawDataExperiencia[i].id == dataToUpdate.id) {
          this.rawDataExperiencia[i]['fecha_fin'] = null;
          this.rawDataExperiencia[i]['es_trabajo_actual'] = true;
          this.updateEntity("experiencia", this.rawDataExperiencia[i]);
          break;
        }
      }

    }
  }


  // Edition methods 

  editData(entity: string, dataToUpdate: any, key: string, value: any, id: string) {
    if (key.includes("fecha")) { //update th UI for fechas
      dataToUpdate[key] = this.convertirFechaAMesAno(value);
    } else if (key == "empresa_institucion_id") { //update the UI for empresa
      dataToUpdate[key] = value;
      for (let j = 0; j < this.empInstList.length; j++) {
        if (dataToUpdate.empresa_institucion_id == this.empInstList[j].id) {
          dataToUpdate['empresa_institucion_nombre'] = this.empInstList[j].nombre;
          dataToUpdate['empresa_institucion_url_logo'] = this.empInstList[j].url_logo;
          dataToUpdate['empresa_institucion_alt_text_logo'] = this.empInstList[j].alt_text_logo;
          console.log(dataToUpdate);
        }
      }
    } else { //updates UI 
      dataToUpdate[key] = value;
    }
    document.getElementById(id)!.classList.remove('d-inline');
    document.getElementById(id)!.classList.add('d-none');

    // update the object that will be sent to the DB
    for (let i = 0; i < this.rawDataExperiencia.length; i++) {
      if (this.rawDataExperiencia[i].id == dataToUpdate.id) {
        this.rawDataExperiencia[i][key] = value;
        this.updateEntity(entity, this.rawDataExperiencia[i]);
        break;
      }
    }
  }

  editFechaFin(dataToUpdate: any, value: string, id: string) {
    // update the UI
    dataToUpdate['fecha_fin'] = this.convertirFechaAMesAno(value);
    dataToUpdate['es_trabajo_actual'] = false;
    document.getElementById(id)!.classList.remove('d-inline');
    document.getElementById(id)!.classList.add('d-none');

    // update the DB
    for (let i = 0; i < this.rawDataExperiencia.length; i++) {
      if (this.rawDataExperiencia[i].id == dataToUpdate.id) {
        this.rawDataExperiencia[i]['fecha_fin'] = value;
        this.rawDataExperiencia[i]['es_trabajo_actual'] = false;
        this.updateEntity("experiencia", this.rawDataExperiencia[i]);
        break;
      }
    }
  }

  updateEntity(entity: string, dataToUpdate: any) {
    this.datosPortfolio.modificarDatos(entity, dataToUpdate).subscribe((data: any) => {
      console.log(data);
    });
  }

  // Creation methods

  objetoExperiencia: any = {};

  // Create the experiencia object that will be sent to the DB later
  crearObjetoExperiencia(key: string, value: string) {
    this.objetoExperiencia[key] = value;
    console.log(this.objetoExperiencia);
  }

  // Add es trabajo actual to experiencia object
  agregarEmpleoActualObjetoExperiencia(event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;

    if (isChecked) {
      // remove fecha fin field from view
      document.getElementById("fecha_fin_nueva_experiencia")?.classList.remove('d-inline');
      document.getElementById("fecha_fin_nueva_experiencia")?.classList.add('d-none');
      //add to experiencia object
      this.objetoExperiencia['es_trabajo_actual'] = true;
      this.objetoExperiencia['fecha_fin'] = null;
    } else {
     // add fecha fin field into view
     document.getElementById("fecha_fin_nueva_experiencia")?.classList.remove('d-none');
     document.getElementById("fecha_fin_nueva_experiencia")?.classList.add('d-inline');
    // add to experiencia object
    this.objetoExperiencia['es_trabajo_actual'] = false; 
    }

  }

  // Add fecha fin to experiencia object
  agregarFechaFinObjetoExperiencia(fechaValue: string) {
    this.objetoExperiencia['es_trabajo_actual'] = false;
    this.objetoExperiencia['fecha_fin'] = fechaValue;
  }


  // Post the new experiencia object created
  crearExperiencia() {
    this.datosPortfolio.postearDatos('experiencia', this.objetoExperiencia).subscribe(data => {
      console.log(data);
    });
    window.location.reload();
  }

  // Delete methods

  borrarExperiencia(id: number) {
    this.datosPortfolio.borrarDatos('experiencia', id).subscribe(data => {
      console.log(data);
    });
    window.location.reload();
  }

}
