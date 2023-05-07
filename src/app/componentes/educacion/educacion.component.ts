import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionFormalList: any;
  rawDataEducacionFormal: any;
  cursoList: any;
  rawDataCurso: any;
  empInstList: any;

  constructor(private datosPortfolio: PortfolioService, public autenticacionServicio:AutenticacionService) { }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatos("educacion_formal").subscribe(data => {
      this.rawDataEducacionFormal = JSON.parse(JSON.stringify(data));

      for (let educacion of data) {
        educacion.fecha_inicio = this.convertirFechaAMesAno(educacion.fecha_inicio);
        educacion.fecha_fin = this.convertirFechaAMesAno(educacion.fecha_fin);
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
        this.educacionFormalList = data;
      });

    });

    this.datosPortfolio.obtenerDatos("curso").subscribe(data => {
      this.rawDataCurso = JSON.parse(JSON.stringify(data));

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
      });

    });

  }

  convertirFechaAMesAno(fecha:string): string {
    const date = new Date(fecha); // create a new Date object with fecha
    const options: any = { year: 'numeric', month: 'long' }; // options for formatting the date
    const formattedDate = date.toLocaleDateString('es-ES', options); // format the date to "Month Year" format

    return formattedDate;// output format: "novembre de 2023"
  }

  cortarFecha(fecha: any): string {
    if (!fecha) {
      return "";
    }

    return fecha.split("T")[0];
  }

  // Changes the display class of an element with a specific id
  showById(idToShow:string){
    console.log(idToShow);
    document.getElementById(idToShow)!.classList.remove('d-none');
    document.getElementById(idToShow)!.classList.add('d-inline');
  }

  // Educacion methods
    
  // Edition methods 

  editData(entity: string, dataToUpdate:any, rawData:any, key:string, value: string, id:string){
    if (key.includes("fecha")){ //actualiza la UI para fechas
      dataToUpdate[key] = this.convertirFechaAMesAno(value)
    } else if (key == "empresa_institucion_id"){ //actualiza la UI para empresa
      dataToUpdate[key] = value;
        for (let j = 0; j < this.empInstList.length; j++){
          if (dataToUpdate.empresa_institucion_id == this.empInstList[j].id){
            dataToUpdate['empresa_institucion_nombre'] = this.empInstList[j].nombre;
            dataToUpdate['empresa_institucion_url_logo'] = this.empInstList[j].url_logo;
            dataToUpdate['empresa_institucion_alt_text_logo'] = this.empInstList[j].alt_text_logo;
            console.log(dataToUpdate);
          }
        }
      } else { //updates UI for the rest of the keys
      dataToUpdate[key] = value; 
    }
    document.getElementById(id)!.classList.remove('d-inline');
    document.getElementById(id)!.classList.add('d-none');
    // update the object that will be sent to the DB
    for (let i = 0; i < rawData.length; i++){
      if (rawData[i].id == dataToUpdate.id){
        rawData[i][key] = value;
        this.updateEntity(entity, rawData[i]);
        break;
      }
    }
    console.log('Este es el archivo raw data: ' + JSON.stringify(rawData));
  }

  updateEntity(entity: string, dataToUpdate:any){
    this.datosPortfolio.modificarDatos(entity, dataToUpdate).subscribe((data: any) => {
      console.log(data);
    });
  }

  // Creation methods

  objetoEducacion: any = {};

  // Create the educacion object that will be sent to the DB later
  crearObjetoEducacion(key:string, value:string){
    this.objetoEducacion[key] = value;
  }

  // Post the new educacion object created
  crearEducacion(entity:string){
        this.datosPortfolio.postearDatos(entity, this.objetoEducacion).subscribe(data =>{
      console.log(data);
      // reload inside of the subscribe so that the request is not killed by the reload before the change is made in the DB
      window.location.reload();
    });
    // window.location.reload();
  }

  // Delete methods

  borrarEducacion(entity:string, id:number){
    this.datosPortfolio.borrarDatos(entity, id).subscribe(data => {
      console.log(data);
      // reload inside of the subscribe so that the request is not killed by the reload before the change is made in the DB
      window.location.reload();
    });
    // window.location.reload();
  }

  // EmpresaInstitucion methods
    
  // Edition methods 

  editDataEmpInst(dataToUpdate:any, key:string, value: string, id:string){
    //updates UI for the rest of the keys
    dataToUpdate[key] = value; 
    //Hides the edition fields
    document.getElementById(id)!.classList.remove('d-inline');
    document.getElementById(id)!.classList.add('d-none');
    // update the object that will be sent to the DB
    this.updateEmpInst(dataToUpdate);
  }

  updateEmpInst(dataToUpdate:any){
    this.datosPortfolio.modificarDatos("empresa_institucion", dataToUpdate).subscribe((data: any) => {
      console.log(data);
    });
  }

  // Creation methods

  objetoEmpInst: any = {};

  // Create the empresaInstitucion object that will be sent to the DB later
  crearObjetoEmpInst(key:string, value:string){
    this.objetoEmpInst[key] = value;
  }

  // Post the new empresaInstitucion object created
  crearEmpInst(){
        this.datosPortfolio.postearDatos('empresa_institucion', this.objetoEmpInst).subscribe(data =>{
      console.log(data);
      // reload inside of the subscribe so that the request is not killed by the reload before the change is made in the DB
      window.location.reload();
    });
    // window.location.reload();
  }

  // Delete methods

  borrarEmpInst (id:number){
    this.datosPortfolio.borrarDatos("empresa_institucion", id).subscribe(data => {
      console.log(data);
      // reload inside of the subscribe so that the request is not killed by the reload before the change is made in the DB
      window.location.reload();
    });
    // window.location.reload();
  }

    // Scroll to a certain div by id, for navigation
    scrollToDiv(id:string){
      document.getElementById(id)!.scrollIntoView();
    }

}
