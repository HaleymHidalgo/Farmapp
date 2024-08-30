import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro-nombre',
  templateUrl: './registro-nombre.page.html',
  styleUrls: ['./registro-nombre.page.scss'],
})
export class RegistroNombrePage implements OnInit {
  //Variables del formulario
  nombre!: string;
  apellido_p!: string;
  apellido_m!: string;

  //Arreglo con los datos de un nuevo usuario
  nuevoUsuario: any = {
    nombre: "",
    apellido_p: "",
    apellido_m: "",
    email:"",
    telefono:"",
    direccion:"",
    imgPerfil:"",
    password: "",
    rol: "autocuidado"
  };

  constructor(private router: Router, private alertcontroller: AlertController) { }

  ngOnInit() {
  }

  //Función que se ejecuta al presionar el botón de continuar
  siguienteFormulario() {
    //Si el usuario no ingreso valores en los inputs o los dejo vacios
    if (this.nombre == undefined || this.apellido_p == undefined || this.apellido_m == undefined ||
        this.nombre == "" || this.apellido_p == "" || this.apellido_m == "")
    {
      const titulo = "Campos vacios";
      const mensaje = "Por favor, valide que los campos contengan su información";
      this.alerta(titulo, mensaje)
      return;
    }
    //Si pasa la validación, entonces guarda los datos
    this.nuevoUsuario.nombre = this.nombre;
    this.nuevoUsuario.apellido_p = this.apellido_p;
    this.nuevoUsuario.apellido_m = this.apellido_m;

    //Preparamos la data para enviarla a la siguiente pagina
    let navigationextras: NavigationExtras = {
      state: {
        nuevoUsuario: this.nuevoUsuario
      }
    }

    //Redirecciona al siguiente formulario
    this.router.navigate(['/registro-contacto'], navigationextras);
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
