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
      console.log(data);
      this.miPortfolio = data[0];
    });
  }

  showById(idToShow:string){
    document.getElementById(idToShow)!.classList.remove('invisible');
    document.getElementById(idToShow)!.classList.add('visible');
  }

  editMiPortfolio(key:string, value: string, id:string){
    this.miPortfolio[key] = value;
    document.getElementById(id)!.classList.remove('visible');
    document.getElementById(id)!.classList.add('invisible');
    this.updatePersona();
  }

  updatePersona(){
    this.datosPortfolio.modificarDatos("persona", this.miPortfolio).subscribe(data => {
      console.log(data);
    });
  }
  
  scrollToDiv(id:string){
    document.getElementById(id)!.scrollIntoView();
  }

}
