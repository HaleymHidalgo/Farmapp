import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';
import { EmailService } from 'src/app/core/services/email.service';

@Component({
  selector: 'app-codigo-password',
  templateUrl: './codigo-password.page.html',
  styleUrls: ['./codigo-password.page.scss'],
})
export class CodigoPasswordPage implements OnInit {

  //Variables para el formulario de recuperación de contraseña
  token!: number;
  enviado: boolean = false;
  codigoRecuperacion!: number;
  emailRecuperacion!: string;

  constructor(private emailServ:EmailService, private alert:AlertsService, private router:Router, private db:DatabaseService) { }

  ngOnInit() {
  }

  async recuperarPassword(){

    //Validamos que el email no esté vacío
    if(this.emailRecuperacion == undefined || this.emailRecuperacion == "") {
      this.alert.mostrar("Error", "Por favor, ingrese su correo electrónico");
      return;
    }

    this.emailRecuperacion = this.emailRecuperacion.toLowerCase();
    
    //Validamos que el email este en la base de datos
    if(await !this.db.emailExiste(this.emailRecuperacion)) {
      this.alert.mostrar("Error", "El correo ingresado no está registrado en el sistema");
      return;
    }

    //Mostramos el formulario de codigo recuperación
    this.enviado = !this.enviado;

    //Generamos el codigo de recuperación
    this.token = Math.floor(Math.random() * 1000000);

    //Enviamos el correo
    this.emailServ.enviarCorreo(this.emailRecuperacion, this.token).subscribe(data => {
      //Mostramos el mensaje de éxito
      this.alert.mostrar("Correo enviado", "Se ha enviado un correo con el código de recuperación: " + JSON.stringify(data));
    });
  }

  validarCodigo() {
    if (this.codigoRecuperacion == this.token) {
      //Mostramos el mensaje de éxito
      this.alert.mostrar("Código correcto", "Por favor, ingrese su nueva contraseña");
      this.router.navigate(['/cambiar-password'], { state: { email: this.emailRecuperacion } });
    } else {
      this.alert.mostrar("Código incorrecto", "Por favor, ingrese el código correcto");
    }
  }

}
