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

  mostrarEdit(key:string){
    document.getElementById("edit_" + key + "_persona")!.classList.remove('invisible');
    document.getElementById("edit_" + key + "_persona")!.classList.add('visible');
  }

  editMiPortfolio(key:string, value: string, id:string){
    this.miPortfolio[key] = value;
    document.getElementById("edit_" + key + "_persona")!.classList.remove('visible');
    document.getElementById("edit_" + key + "_persona")!.classList.add('invisible');
    this.updatePersona();
  }

  updatePersona(){
    this.datosPortfolio.modificarDatos("persona", this.miPortfolio).subscribe(data => {
      console.log(data);
    });
  }
  

}
