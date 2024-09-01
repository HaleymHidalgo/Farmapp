import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pregunta-seguridad',
  templateUrl: './pregunta-seguridad.page.html',
  styleUrls: ['./pregunta-seguridad.page.scss'],
})
export class PreguntaSeguridadPage implements OnInit {
  //variable que almacena la respuesta a la pregunta de seguridad
  respuesta!: string;
  respuestaCorrecta: string = "alan";

  constructor(private alertcontroller: AlertController, private router: Router) { }

  ngOnInit() {
  }

  validarRespuesta(){
    //Validamos que el campo no este vacio
    if(this.respuesta == undefined || this.respuesta == ""){
      const titulo = "Campos vacios";
      const mensaje = "Por favor ingrese alguna respuesta en el campo de respuesta";
      this.alerta(titulo, mensaje);
      return;
    }

    //Validamos que la respuesta sea correcta
    if(this.respuesta.toLowerCase() == this.respuestaCorrecta){
      this.router.navigate(['/soporte/opciones-cliente']);
    }
  }


  async alerta(titulo:string , mensaje: string){
    const alert = await this.alertcontroller.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
