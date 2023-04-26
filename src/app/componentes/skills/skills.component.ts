import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Chart } from 'chart.js/auto'

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit{
  hardSkillsList:any;
  softSkillsList:any;
  chartList: any[] = [];
  
  constructor(private datosPortfolio:PortfolioService){ }
   

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos("hard_skill").subscribe(data => {
      console.log(data);
      
      //this.softSkillsList = data.skills.softSkills;
      for(let i = 0; i < data.length; i++){
        this.inicializarHTML(i);
      }

      let self = this;

      setTimeout(function() {
        for (let i = 0; i < data.length; i++) {
          self.createChart(i, data[i].skill, data[i].nivel);
        }
       }, 100);
     
    });

    this.datosPortfolio.obtenerDatos("soft_skill").subscribe(data => {
      console.log(data);
      this.softSkillsList = data;     
    });
  }

  inicializarHTML(index:number){
    let col2 = document.createElement("div");
    col2.classList.add("col-2");
    
    let canvas = document.createElement("canvas");
    canvas.id = "chart-" + index;

    col2.appendChild(canvas);
    document.getElementById("fila-hard-skills")!.appendChild(col2);
  }

  createChart(index:number, titulo: string, porcentaje: number){
  
    return new Chart("chart-" + index, {
      type: 'doughnut', //this denotes the type of chart

      data: {
	       datasets: [
          {
            label: "Skill",
            data: [100-porcentaje, porcentaje],
            backgroundColor: ['white', 'green'],
            borderColor: 'green',
            borderWidth: 1,
          },
        ]
      },
      options: {
        responsive: true,
        aspectRatio:2.5,
        plugins: {
          title: {
            display: true,
            text: titulo,
            position: 'bottom',
            color: 'black',
            padding: 5,
            fullSize: true,
            font: {family: 'system-ui', size: 16}
          },

        }
      },

    });
  }
}
