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
      this.header = data[0];
    });

    this.datosPortfolio.obtenerDatos("red_social").subscribe(data => {
      this.redSocialList = data;
    });
  }

  // Changes the display class of an element with a specific id

  showById(idToShow:string){
    document.getElementById(idToShow)!.classList.remove('d-none');
    document.getElementById(idToShow)!.classList.add('d-inline');
  }

  // Edition methods

  // edit Header
  editHeader(dataToUpdate:any, key:string, value: string, idToHide:string){
    dataToUpdate[key] = value; //updates UI 
    document.getElementById(idToHide)!.classList.remove('d-inline');
    document.getElementById(idToHide)!.classList.add('d-none');
    //passes the object that will be sent to the DB
    this.updateHeader(dataToUpdate);
  }

  // update header in DB
  updateHeader(dataToUpdate:any){
    this.datosPortfolio.modificarDatos('header', dataToUpdate).subscribe((data: any) => {
    });
  }

  // edit Red Social
  editRedSocial(dataToUpdate:any, key:string, value: string){
    //updates UI
    dataToUpdate[key] = value; 
  }

  // update red social in DB and hide edit div
  submitEditRedSocial(dataToUpdate:any, idToHide:string){
    this.datosPortfolio.modificarDatos('red_social', dataToUpdate).subscribe((data: any) => {
    });
    document.getElementById(idToHide)!.classList.remove('d-inline');
    document.getElementById(idToHide)!.classList.add('d-none');
  }

  // Creation methods

  objetoRedSocial: any = {};

  // Create the experiencia object that will be sent to the DB later
  crearObjetoRedSocial(key:string, value:string){
    this.objetoRedSocial[key] = value;
  }
  // Post the new experiencia object created
  crearRedSocial(){
      this.datosPortfolio.postearDatos('red_social', this.objetoRedSocial).subscribe(data =>{
      // reload inside of the subscribe so that the request is not killed by the reload before the change is made in the DB
      window.location.reload();
    });
    // window.location.reload();
  }

  // Delete methods

  borrarRedSocial(id:number){
    this.datosPortfolio.borrarDatos('red_social', id).subscribe(data => {
      // reload inside of the subscribe so that the request is not killed by the reload before the change is made in the DB
      window.location.reload();
    });
    // window.location.reload();
  }

  // Login and logout

  loginClick(){
    this.ruta.navigateByUrl('/iniciar-sesion');
  }

  logoutClick(){
    this.autenticacionServicio.logout();
  }

}
