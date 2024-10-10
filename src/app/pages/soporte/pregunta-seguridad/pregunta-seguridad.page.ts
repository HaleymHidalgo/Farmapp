import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-pregunta-seguridad',
  templateUrl: './pregunta-seguridad.page.html',
  styleUrls: ['./pregunta-seguridad.page.scss'],
})
export class PreguntaSeguridadPage implements OnInit {
  //variable que almacena la respuesta a la pregunta de seguridad
  pregunta!: string;
  respuesta!: string;
  campo!: string;

  constructor(private alertcontroller: AlertController, private router: Router, private db:DatabaseService, private alerts:AlertsService) { }

  ngOnInit() {
    this.actualizarCredencialesUsuario();
  }

  async actualizarCredencialesUsuario(){
    this.db.fetchCredencialesUsuario().subscribe(data => {
      this.alerts.mostrar('Datos: ', JSON.stringify(data));
      this.pregunta = data.pregunta;
      this.respuesta = data.res_seguridad;
    });
  }

  validarRespuesta(){
    //Validamos que el campo no este vacio
    if(this.respuesta == undefined || this.respuesta == ""){
      this.alerts.mostrar('Error', 'Campo vacio, ingrese respuesta');
      return;
    }

    //Validamos que la respuesta sea correcta
    if(this.campo.toLowerCase() != this.respuesta.toLocaleLowerCase()){
      this.alerts.mostrar('Error', 'Respuesta incorrecta');
      return;
    }

    //Si la respuesta es correcta redirigimos al usuario a la pagina de opciones de cliente

    this.router.navigate(['/soporte/opciones-cliente']);
  }
}