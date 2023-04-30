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

  mostrarEdit(key:string){
    document.getElementById("edit_" + key)!.classList.remove('d-none');
    document.getElementById("edit_" + key)!.classList.add('d-inline');
  }

  editData(entity: string, dataToUpdate:any,key:string, value: string, id:string){
    dataToUpdate[key] = value;
    document.getElementById("edit_" + key)!.classList.remove('d-inline');
    document.getElementById("edit_" + key)!.classList.add('d-none');
    this.updateEntity(entity, dataToUpdate);
  }

  updateEntity(entity: string, dataToUpdate:any){
    this.datosPortfolio.modificarDatos(entity, dataToUpdate).subscribe((data: any) => {
      console.log(data);
    });
  }

  loginClick(){
    this.ruta.navigateByUrl('/iniciar-sesion');
  }

}
