import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.page.html',
  styleUrls: ['./cambiar-password.page.scss'],
})
export class CambiarPasswordPage implements OnInit {

  password!: string;
  confirmPassword!: string;

  constructor(private alertcontroller: AlertController, private router: Router) { }

  ngOnInit() {
  }

  cambiarPassword() {
    //Si el usuario no ingreso valores en los inputs o los dejo vacios
    if (this.password == undefined || this.confirmPassword == undefined||
      this.password == "" || this.confirmPassword == "")
    {
      const titulo = "Campos vacios";
      const mensaje = "Por favor, valide que los campos contengan su información";
      this.alerta(titulo, mensaje)
      return;
    }

    //Validación de formatos
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(this.password)){
      const titulo = "Contraseña invalida";
      const mensaje = "Por favor, valide que su contraseña concuerde con los requisitos especificados";
      this.alerta(titulo, mensaje)
      return;
    }

    //Validar que coincidan
    if(this.password != this.confirmPassword){
      const titulo = "Contraseñas no coinciden";
      const mensaje = "Por favor, valide que las contraseñas coincidan";
      this.alerta(titulo, mensaje)
      return;
    }

    //Si pasa todas las validaciones
    this.alerta("Contraseña cambiada", "Su contraseña ha sido cambiada exitosamente");
    this.router.navigate(['soporte/menu-principal']);

  }


  async alerta(titulo: string, mensaje: string) {
    const alert = await this.alertcontroller.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
