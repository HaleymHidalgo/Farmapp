import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/core/services/alerts.service';
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

  constructor(private emailServ:EmailService, private alert:AlertsService, private router:Router) { }

  ngOnInit() {
  }

  recuperarPassword(){
    //Mostramos el formulario de codigo recuperación
    this.enviado = !this.enviado;

    //Generamos el codigo de recuperación
    this.token = Math.floor(Math.random() * 1000000);

    //Enviamos el correo
    this.emailServ.enviarCorreo(this.emailRecuperacion, this.token.toString()).subscribe(
      response => {
        this.alert.mostrar("Correo enviado", "Se ha enviado un correo con el código de recuperación");
      },
      error => {
        this.alert.mostrar("Error", "No se pudo enviar el correo: " + JSON.stringify(error));
      }
    );
  }

  validarCodigo() {
    if (this.codigoRecuperacion == this.token) {
      // 2. Mostramos el mensaje de éxito
      this.alert.mostrar("Código correcto", "Por favor, ingrese su nueva contraseña");
      this.router.navigate(['/cambiar-password'], { state: { email: this.emailRecuperacion } });
    } else {
      this.alert.mostrar("Código incorrecto", "Por favor, ingrese el código correcto");
    }
  }

}
