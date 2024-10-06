import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/core/models/usuario';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { CamaraService } from 'src/app/core/services/camara.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  //Arreglo con los datos de un usuario 'Autocuidado'
  esEditable:boolean=false;
  datosUsuario!:Usuario;
  campos: any = [];
  imgPerfil!:string;

  constructor(private menucontroller: MenuController, private db:DatabaseService, private alert:AlertsService, private camara:CamaraService) {
    //Obtenemos los datos del usuario
    this.db.fetchUsuarioActual().subscribe(data => {
      this.datosUsuario = data;
    })
    this.obtenerDatosUser()
  }

  ngOnInit() {
    //Habilitamos el menu de autocuidado
    this.menucontroller.enable(false, 'soporte');
    this.menucontroller.enable(true, 'autocuidado');
  }

  //---------> Metodos de la Vista <---------
  editarCampos() {
    this.esEditable = !this.esEditable;
  }

  obtenerDatosUser(){
    //Seteamos el arreglo con los datos de el usuario
    this.campos = [
      {label_input: 'Nombre', dato_usuario: this.datosUsuario.nombre},
      {label_input: 'Apellido Paterno', dato_usuario: this.datosUsuario.apellido_p},
      {label_input: 'Apellido Materno', dato_usuario: this.datosUsuario.apellido_m},
      {label_input: 'Correo', dato_usuario: this.datosUsuario.email},
      {label_input: 'Telefono', dato_usuario: this.datosUsuario.telefono},
      {label_input: 'Direccion', dato_usuario: this.datosUsuario.direccion}
    ]
    //Seteamos la imagen de perfil
    this.camara.obtenerFoto(this.datosUsuario.img_url)
    .then((data) => {
      this.imgPerfil = data;
    });
  }

  cancelarCambios(){
    this.esEditable = false;
    this.obtenerDatosUser();
  }

  confirmarCambios(){
    //Validamos que los campos no esten vacios

    //validamos que los datos sean correctos

    //Actualizamos los datos del usuario
  }

}
