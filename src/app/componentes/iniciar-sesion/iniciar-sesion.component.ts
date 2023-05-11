import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private autenticacionService:AutenticacionService, private ruta:Router ){
    this.form = this.formBuilder.group(
      { // Los campos que figuran aca son los del Body del JSON del POST de autenticacion.
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(7)]],

      }
    );
  }

  ngOnInit(): void{

  }

  get Email(){
    return this.form.get('username');
  }

  get Password(){
    return this.form.get('password');
  }

  onEnviar(event:Event){
    document.getElementById("spinnerIniciarSesion")!.classList.remove('d-none');
    document.getElementById("submitIniciarSesion")?.setAttribute("disabled", "true");
    event.preventDefault;
    this.autenticacionService.iniciarSesion(this.form.value).subscribe(data => {
      if (data == "") {
        // Hubo un error de autenticacion
        document.getElementById("authErrorMessage")!.classList.remove("d-none");
        document.getElementById("spinnerIniciarSesion")!.classList.add('d-none');
        document.getElementById("submitIniciarSesion")?.removeAttribute("disabled");
      } else {
        this.ruta.navigate(['/portfolio']);
      }      
    });
  }

}
