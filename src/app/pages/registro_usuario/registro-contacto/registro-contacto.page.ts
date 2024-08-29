import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro-contacto',
  templateUrl: './registro-contacto.page.html',
  styleUrls: ['./registro-contacto.page.scss'],
})
export class RegistroContactoPage implements OnInit {
  //Variable de nuevo usuario
  nuevoUsuario!: any;

  //Variables del formulario
  nrTelefono!:string;
  email!:string;
  direccion!:string;

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
    if (this.nrTelefono == undefined || this.email == undefined || this.direccion == undefined ||
        this.nrTelefono == "" || this.email == "" || this.direccion == "")
    {
      const titulo = "Campos vacios";
      const mensaje = "Por favor, valide que los campos contengan su información";
      this.alerta(titulo, mensaje)
      return;
    }

    //Validación de formatos

    //Numero de Telefono
    const chilePhoneRegex = /^\+569\d{8}$/;
    if(!chilePhoneRegex.test(this.nrTelefono)){
      const titulo = "Telefono Invalido";
      const mensaje = "Por favor, valide que el numero de telefono este escrito correctamente";
      this.alerta(titulo, mensaje)
      return;
    }

    //Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(this.email)){
      const titulo = "Correo electronico Invalido";
      const mensaje = "Por favor, valide que el correo electronico este escrito correctamente";
      this.alerta(titulo, mensaje)
      return;
    }

    //Si pasa las validaciones, entonces guarda los datos
    this.nuevoUsuario.telefono = this.nrTelefono;
    this.nuevoUsuario.email = this.email;
    this.nuevoUsuario.direccion = this.direccion;

    //Preparamos la data para enviarla a la siguiente pagina
    let navigationextras: NavigationExtras = {
      state: {
        nuevoUsuario: this.nuevoUsuario
      }
    }

    //Redirecciona al siguiente formulario
    this.router.navigate(['/registro-password'], navigationextras);
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
