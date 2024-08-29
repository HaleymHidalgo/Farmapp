import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //Usuario temporal para hacer validaciones
  usuario:any = {
    email: "hal.hidalgo@duocuc.cl",
    password: "haleym123",
    rol: "autocuidado"
  };

  //Variables que almacenan los datos de acceso
  email!: string;
  password!: string;

  constructor(private router: Router, private alertcontroller: AlertController) { }
  
  ngOnInit() {
  }

  validarLogin() {
    //Validaciones de formato (Correo)
    if(!this.email.includes("@")) { 
      const titulo = "Correo Electronico invalido";
      const mensaje = "Por favor, ingrese sus datos nuevamente";
      this.alertaLogin(titulo, mensaje);
      return;
    }

    //Validar que el usuario y contraseña coincidan con los del usuario temporal
    if(this.email == this.usuario.email && this.password == this.usuario.password) {
      //Si el login es correcto, redireccionar a la lista de medicamentos (Pag. Principal)
      if(this.usuario.rol == "autocuidado"){
        this.router.navigate(['/lista_medicamentos']);
      }else{
        //Si el login es correcto, redireccionar a la vista de Soporte (Pag. Principal)
      }
    }else{
      //Si el login es incorrecto, mostrar una alerta de error
      const titulo = "Credenciales incorrectas";
      const mensaje = "Por favor, ingrese sus datos nuevamente";
      this.alertaLogin(titulo, mensaje);
    }
  }

  async alertaLogin(titulo:string , mensaje: string){
    const alert = await this.alertcontroller.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

}
