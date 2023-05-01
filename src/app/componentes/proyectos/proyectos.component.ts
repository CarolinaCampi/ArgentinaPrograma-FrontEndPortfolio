import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit{
  proyectosList:any;
  rawDataProyecto: any;
  
  constructor(private datosPortfolio:PortfolioService, public autenticacionServicio:AutenticacionService){ }
  

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos("proyecto").subscribe(data => {
      this.rawDataProyecto = JSON.parse(JSON.stringify(data));
      
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

  // Changes the display class of an element with a specific id
  mostrarById(id:string){
    console.log(id);
    document.getElementById(id)!.classList.remove('d-none');
    document.getElementById(id)!.classList.add('d-inline');
  }
    
  // Edition methods 

  editData(entity: string, dataToUpdate:any, rawData:any, key:string, value: string, id:string){
    if (key.includes("fecha")){ //actualiza la UI para fechas
      dataToUpdate[key] = this.convertirFechaAMesAno(value)
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

  objetoProyecto: any = {};

  // Create the Proyecto object that will be sent to the DB later
  crearObjetoProyecto(key:string, value:string){
    this.objetoProyecto[key] = value;
    console.log(this.objetoProyecto);
  }
  // Post the new Proyecto object created
  crearProyecto(){
        this.datosPortfolio.postearDatos("proyecto", this.objetoProyecto).subscribe(data =>{
      console.log(data);
    });
    window.location.reload();
  }

  // Delete methods

  borrarProyecto(id:number){
    this.datosPortfolio.borrarDatos('proyecto', id).subscribe(data => {
      console.log(data);
    });
    window.location.reload();
  }

}
