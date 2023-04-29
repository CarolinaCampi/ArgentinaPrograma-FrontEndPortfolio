import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  
  miPortfolio:any ={};
  
  constructor(private datosPortfolio:PortfolioService){  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos("persona").subscribe(data => {
      console.log(data);
      this.miPortfolio = data[0];
    });
  }

  mostrar_edit(){
    document.getElementById("edit_nombre_persona")!.style.display="inline";
  }

  edit(nuevo_nombre:string){
    document.getElementById("nombre_persona")!.innerText = nuevo_nombre;
  }

}
