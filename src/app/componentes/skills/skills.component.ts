import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Chart } from 'chart.js/auto'
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  hardSkillsList: any;
  softSkillsList: any;
  chartList: any[] = [];

  constructor(private datosPortfolio: PortfolioService, public autenticacionServicio: AutenticacionService) { }


  ngOnInit(): void {

    this.datosPortfolio.obtenerDatos("hard_skill").subscribe(data => {
      document.getElementById("spinnerLoadingHardSkill")?.classList.add("d-none");
      document.getElementById("spinnerLoadingSoftSkill")?.classList.add("d-none");
      for (let i = 0; i < data.length; i++) {
        this.inicializarHTML(i, data[i].id);
      }

      let self = this;
      setTimeout(function () {
        for (let i = 0; i < data.length; i++) {
          self.createChart(i, data[i].skill, data[i].nivel);
        }
      }, 100);

    });

    this.datosPortfolio.obtenerDatos("soft_skill").subscribe(data => {
      this.softSkillsList = data;
    });
  }

  inicializarHTML(index: number, id: number) {
    let col1 = document.createElement("div");
    col1.classList.add("col-1", "border", "my-3", "mx-4");

    let canvas = document.createElement("canvas");
    canvas.id = "chart-" + index;
    canvas.classList.add("d-inline");

    if (this.autenticacionServicio.isLoggedIn()) {

      let button_tachito = document.createElement("button");
      button_tachito.classList.add("btn", "d-block", "mx-auto");
      button_tachito.setAttribute("id", "deleteHardSkill" + id);

      let tachito = document.createElement("i");
      tachito.classList.add("bi", "bi-trash", "mx-auto");
      tachito.setAttribute("id", 'trashHardSkill' + id);

      let spinner = document.createElement("span");
      spinner.classList.add("spinner-border", "spinner-border-sm", "d-none");
      spinner.setAttribute("id", "spinnerDeleteHardSkill" + id);
      spinner.setAttribute("role", "status");
      spinner.setAttribute("aria-hidden", "true");

      button_tachito.appendChild(tachito);
      button_tachito.appendChild(spinner);
      col1.appendChild(canvas);
      col1.appendChild(button_tachito);

      let self = this;
      button_tachito.addEventListener("click", function () {
        self.borrarHardSkill('hard_skill', id);
      });

    } else {
      col1.appendChild(canvas);
    }
    document.getElementById("fila-hard-skills")!.appendChild(col1);
  }

  createChart(index: number, titulo: string, porcentaje: number) {
    return new Chart("chart-" + index, {
      type: 'doughnut', //this denotes the type of chart

      data: {
        datasets: [
          {
            label: "Skill",
            data: [100 - porcentaje, porcentaje],
            backgroundColor: ['white', 'green'],
            borderColor: 'green',
            borderWidth: 1,
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: titulo,
            position: 'bottom',
            color: 'black',
            font: { family: 'helvetica', size: 16 }
          },
        }
      },
    });
  }

  // Changes the display class of an element with a specific id
  showById(idToShow: string) {
    document.getElementById(idToShow)!.classList.remove('d-none');
    document.getElementById(idToShow)!.classList.add('d-inline');
  }

  // Creation methods

  objetoSkill: any = {};

  // Create the skill object that will be sent to the DB later
  crearObjetoSkill(key: string, value: string) {
    this.objetoSkill[key] = value;
  }
  // Post the new hard skill object created
  crearHardSkill(entity: string) {
    document.getElementById("spinnerNewHardSkill")!.classList.remove('d-none');
    document.getElementById("submitNewHardSkill")?.setAttribute("disabled", "true");
    this.datosPortfolio.postearDatos(entity, this.objetoSkill).subscribe(data => {
      // reload inside of the subscribe so that the request is not killed by the reload before the change is made in the DB
      window.location.reload();
    });
  }

  // Post the new soft skill object created
  crearSoftSkill(entity: string) {
    document.getElementById("spinnerNewSoftSkill")!.classList.remove('d-none');
    document.getElementById("submitNewSoftSkill")?.setAttribute("disabled", "true");
    this.datosPortfolio.postearDatos(entity, this.objetoSkill).subscribe(data => {
      // reload inside of the subscribe so that the request is not killed by the reload before the change is made in the DB
      window.location.reload();
    });
  }

  // Delete methods

  borrarHardSkill(entity: string, id: number) {
    document.getElementById('trashHardSkill' + id)?.classList.add('d-none');
    document.getElementById('spinnerDeleteHardSkill' + id)?.classList.remove('d-none');
    document.getElementById("deleteHardSkill" + id)?.setAttribute("disabled", "true");
    this.datosPortfolio.borrarDatos(entity, id).subscribe(data => {
      // reload inside of the subscribe so that the request is not killed by the reload before the change is made in the DB
      window.location.reload();
    });
  }

  borrarSoftSkill(entity: string, id: number) {
    document.getElementById('trashSoftSkill' + id)?.classList.add('d-none');
    document.getElementById('spinnerDeleteSoftSkill' + id)?.classList.remove('d-none');
    document.getElementById("deleteSoftSkill" + id)?.setAttribute("disabled", "true");
    this.datosPortfolio.borrarDatos(entity, id).subscribe(data => {
      // reload inside of the subscribe so that the request is not killed by the reload before the change is made in the DB
      window.location.reload();
    });
  }

  // Scroll to a certain element determined by its id
  scrollToDiv(id: string) {
    document.getElementById(id)!.scrollIntoView();
  }
}
