import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-pregunta-seguridad',
  templateUrl: './pregunta-seguridad.page.html',
  styleUrls: ['./pregunta-seguridad.page.scss'],
})
export class PreguntaSeguridadPage implements OnInit {
  //variable que almacena la respuesta a la pregunta de seguridad
  id_usuario!:number;
  pregunta!: string;
  respuesta!: string;
  campo!: string;

  constructor(private alertcontroller: AlertController, private router: Router, private db:DatabaseService, private alerts:AlertsService, private menucontroller:MenuController, private ns:NativeStorage) { }

  ngOnInit() {
    this.db.fetchCredencialesUsuario().subscribe(data => {
      this.id_usuario = data.id_usuario;
      this.pregunta = data.pregunta;
      this.respuesta = data.res_seguridad;
    });

    this.menucontroller.enable(true, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
  }

  validarRespuesta(){
    //Validamos que el campo no este vacio
    if(this.campo == undefined || this.campo == ""){
      this.alerts.mostrar('Error', 'Campo vacio, ingrese respuesta');
      return;
    }

    //Validamos que la respuesta sea correcta
    if(this.campo.toLowerCase() != this.respuesta.toLowerCase()){
      this.alerts.mostrar('Error', 'Respuesta incorrecta');
      return;
    }

    this.db.obtenerCredencialesUsuario(this.id_usuario);

    //Si la respuesta es correcta redirigimos al usuario a la pagina de opciones de cliente
    this.router.navigate(['/soporte/opciones-cliente']);
  }
}