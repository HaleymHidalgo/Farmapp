import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro-password',
  templateUrl: './registro-password.page.html',
  styleUrls: ['./registro-password.page.scss'],
})
export class RegistroPasswordPage implements OnInit {
  //Variable para el nuevo usuario
  nuevoUsuario!: any;

  //Variables del formulario
  password!: string;
  confirmPassword!: string;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private alertcontroller: AlertController) {
    //Capturamos la información de NavigationExtras
    this.activatedroute.queryParams.subscribe(params => {
      //Validamos si viene o no información desde la pagina
      if(this.router.getCurrentNavigation()?.extras.state){
        //Capturamos la información
        this.nuevoUsuario = this.router.getCurrentNavigation()?.extras?.state?.['nuevoUsuario']
      }
    });
  }

  ngOnInit() {
  }

  //Función que se ejecuta al presionar el botón de continuar
  siguienteFormulario() {
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
    /*
    const chilePhoneRegex = /^\+569\d{8}$/;
    if(!emailRegex.test(this.email)){
      const titulo = "Correo electronico Invalido";
      const mensaje = "Por favor, valide que el correo electronico este escrito correctamente";
      this.alerta(titulo, mensaje)
      return;
    }
    */

    //Validar que coincidan
    if(this.password != this.confirmPassword){
      const titulo = "Contraseñas no coinciden";
      const mensaje = "Por favor, valide que las contraseñas coincidan";
      this.alerta(titulo, mensaje)
      return;
    }

    //Si pasa las validaciones, entonces guarda los datos
    this.nuevoUsuario.password = this.password;

    //Preparamos la data para enviarla a la siguiente pagina
    let navigationextras: NavigationExtras = {
      state: {
        nuevoUsuario: this.nuevoUsuario
      }
    }

    //Redirecciona al siguiente formulario
    this.router.navigate(['/lista_medicamentos'], navigationextras);
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
