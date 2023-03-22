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
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      console.log(data);
      this.hardSkillsList = data.skills.hardSkills;
      this.softSkillsList = data.skills.softSkills;
      for (let i = 0; i < data.skills.hardSkills.length; i++) {
        const chart: any = this.createChart(i, data.skills.hardSkills[i].skill, data.skills.hardSkills[i].nivel);
        chart.titulo = data.skills.hardSkills[i].skill;

        console.log(chart);

        this.chartList.push(chart);
      }

      
    });
  }

  createChart(index:number, titulo: string, porcentaje: number){
    console.log("MyChart-" + index)
  
    return new Chart("MyChart-" + index, {
      type: 'doughnut', //this denotes the type of chart

      data: {// values on X-Axis
        /*labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], */
	       datasets: [
          {
            label: "Skill",
            data: [100-porcentaje, porcentaje],
            backgroundColor: ['white', 'green'],
            borderColor: 'green',
            borderWidth: 1,
          },
          /*{
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }*/  
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
