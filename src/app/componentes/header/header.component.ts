import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  header:any = {};
  redSocialList: any;
  
  constructor(private datosPortfolio:PortfolioService, private ruta:Router, public autenticacionServicio:AutenticacionService){  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos("header").subscribe(data => {
      console.log(data);
      this.header = data[0];
    });

    this.datosPortfolio.obtenerDatos("red_social").subscribe(data => {
      console.log(data);
      this.redSocialList = data;
    });
  }

  // Changes the display class of an element with a specific id

  mostrarById(id:string){
    document.getElementById(id)!.classList.remove('d-none');
    document.getElementById(id)!.classList.add('d-inline');
  }

  // Edition methods

  editData(entity: string, dataToUpdate:any, key:string, value: string, id:string){
    dataToUpdate[key] = value; //updates UI 
    document.getElementById(id)!.classList.remove('d-inline');
    document.getElementById(id)!.classList.add('d-none');
    //passes the object that will be sent to the DB
    this.updateEntity(entity, dataToUpdate);
  }

  updateEntity(entity: string, dataToUpdate:any){
    this.datosPortfolio.modificarDatos(entity, dataToUpdate).subscribe((data: any) => {
      console.log(data);
    });
  }

  // Creation methods

  objetoRedSocial: any = {};

  // Create the experiencia object that will be sent to the DB later
  crearObjetoRedSocial(key:string, value:string){
    this.objetoRedSocial[key] = value;
    console.log(this.objetoRedSocial);
  }
  // Post the new experiencia object created
  crearRedSocial(){
      this.datosPortfolio.postearDatos('red_social', this.objetoRedSocial).subscribe(data =>{
      console.log(data);
    });
    window.location.reload();
  }

  // Delete methods

  borrarRedSocial(id:number){
    this.datosPortfolio.borrarDatos('red_social', id).subscribe(data => {
      console.log(data);
    });
    window.location.reload();
  }

  // Login and logout

  loginClick(){
    this.ruta.navigateByUrl('/iniciar-sesion');
  }

  logoutClick(){
    this.autenticacionServicio.logout();
  }

}
