import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  header:any //= {};
  
  constructor(private datosPortfolio:PortfolioService){  }

  ngOnInit(): void {
    // this.datosPortfolio.obtenerDatos("header").subscribe(data => {
    //   console.log(data);
    //   this.header = data;
    // });

    this.datosPortfolio.obtenerDatosJSON().subscribe(data => {
      console.log(data);
      this.header = data;
    });
  }

}
