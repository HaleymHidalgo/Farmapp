import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/core/models/usuario';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

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

  //Obtener Rol actual
  rolActual!: number;

  //Arreglo con los datos de un nuevo usuario
  nuevoUsuario = new Usuario();

  constructor(private router: Router, private alertcontroller: AlertController, private db: DatabaseService, private alerts:AlertsService) { }

  ngOnInit() {
    //Obtenemos el rol actual
    this.db.fetchUsuarioActual().subscribe(data => this.rolActual = data.id_tipo_usuario);
  }

  //Función que se ejecuta al presionar el botón de continuar
  siguienteFormulario() {
    //Si el usuario no ingreso valores en los inputs o los dejo vacios
    if (this.nombre == undefined || this.apellido_p == undefined || this.apellido_m == undefined ||
        this.nombre == "" || this.apellido_p == "" || this.apellido_m == "")
    {
      const titulo = "Campos vacios";
      const mensaje = "Por favor, valide que los campos contengan su información";
      this.alerts.mostrar(titulo, mensaje)
      return;
    }

    //Valida que el nombre y apellidos no contengan números
    const noNumbersRegex = /^[^\d]+$/;
    if(
      !noNumbersRegex.test(this.nombre) || 
      !noNumbersRegex.test(this.apellido_p) || 
      !noNumbersRegex.test(this.apellido_m))
    {
      const titulo = "Nombre y/o apellidos invalidos";
      const mensaje = "Por favor, valide que los campos de nombre y apellidos no contengan números";
      this.alerts.mostrar(titulo, mensaje)
      return
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

}
