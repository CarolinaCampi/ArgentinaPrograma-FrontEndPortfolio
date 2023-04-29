import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  header:any = {};

  redSocialList: any;
  
  constructor(private datosPortfolio:PortfolioService, private ruta:Router){  }

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

  loginClick(){
    this.ruta.navigateByUrl('/iniciar-sesion');
  }

}
