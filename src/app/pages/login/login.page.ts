import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { DatabaseService } from 'src/app/core/services/database.service';
import { EmailService } from 'src/app/core/services/email.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  //arreglo para el usuario que se registra
  nuevoUsuario!: any;

  //Variables que almacenan los datos de acceso
  email!: string;
  password!: string;

  constructor(private router: Router, private alert:AlertsService, private activatedroute: ActivatedRoute, private db: DatabaseService, private auth:AutenticacionService, private emailServ:EmailService) {
    
    //Capturamos la información de NavigationExtras
    this.activatedroute.queryParams.subscribe(params => {
      //Validamos si viene o no información desde la pagina
      if(this.router.getCurrentNavigation()?.extras.state){
        //Capturamos la información
        this.nuevoUsuario = this.router.getCurrentNavigation()?.extras?.state?.['nuevoUsuario']
      }
    });
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
