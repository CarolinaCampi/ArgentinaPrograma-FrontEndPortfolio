import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  
  miPortfolio:any ={};
  
  constructor(private datosPortfolio:PortfolioService, public autenticacionServicio:AutenticacionService){  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos("persona").subscribe(data => {
      document.getElementById("spinnerLoadingAcercaDe")?.classList.add("d-none");
      this.miPortfolio = data[0];
    });
  }

  // changes an element from invisible to visible
  showById(idToShow:string){
    document.getElementById(idToShow)!.classList.remove('invisible');
    document.getElementById(idToShow)!.classList.add('visible');
  }

  editMiPortfolio(key:string, value: string, id:string){
    //change the UI in real time and change the objet that will be sent to the DB
    this.miPortfolio[key] = value;
    document.getElementById(id)!.classList.remove('visible');
    document.getElementById(id)!.classList.add('invisible');
    // send the changed object to the database
    this.updatePersona();
  }

  // post the change in the object Persona in the DB
  updatePersona(){
    this.datosPortfolio.modificarDatos("persona", this.miPortfolio).subscribe(data => {
    });
  }
  
  // Scroll to a certain element determined by its id
  scrollToDiv(id:string){
    document.getElementById(id)!.scrollIntoView();
  }

}
