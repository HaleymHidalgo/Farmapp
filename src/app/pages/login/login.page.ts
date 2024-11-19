import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //arreglo para el usuario que se registra
  nuevoUsuario!: any;

  //Variables que almacenan los datos de acceso
  email!: string;
  password!: string;

  constructor(private alert:AlertsService, private db: DatabaseService, private auth:AutenticacionService, private menucontroller: MenuController) { }

  ngOnInit(){
    this.menucontroller.enable(false, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
  }

  //Metodo para rescatar la sesion del usuario
  async ionViewWillEnter() {
    await this.auth.obtenerSesion();
  }

  //Metodo para validar el usuario y mantener la sesión
  validarLogin() {
    //Validaciones de campos vacíos
    if(this.email == "" || this.password == "" || this.email == null || this.password == null || this.email == undefined || this.password == undefined) {
      this.alert.mostrar("Campos vacíos", "Por favor, ingrese sus datos");
      return;
    }

    //Validaciones de formato (Correo)
    if(!this.email.includes("@")) {
      this.alert.mostrar("Correo Electronico invalido", "Por favor, ingrese sus datos nuevamente");
      return;
    }

    //Validar que la base de datos esté lista
    this.db.isDBReady.subscribe(async (val) => {
      if(val) {
        //Validar que el usuario exista
        this.auth.iniciarSesion(this.email, this.password);
      }
    });
  }

}
