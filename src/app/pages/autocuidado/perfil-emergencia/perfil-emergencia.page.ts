import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ContactoEmergencia } from 'src/app/core/models/contacto-emergencia';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { CamaraService } from 'src/app/core/services/camara.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-perfil-emergencia',
  templateUrl: './perfil-emergencia.page.html',
  styleUrls: ['./perfil-emergencia.page.scss'],
})
export class PerfilEmergenciaPage implements OnInit {
  //Arreglo con los datos de un usuario 'Autocuidado'
  esEditable:boolean=false;
  datosUsuario!:ContactoEmergencia;

  //Datos del Formulario de Perfil
  nombre!:string;
  apellido_p!:string;
  apellido_m!:string;
  correo!:string;
  telefono!:string;
  direccion!:string;
  imgPerfil!:any;

  constructor(private menucontroller: MenuController, private db:DatabaseService, private alert:AlertsService, private camara:CamaraService, private router:Router) {
    this.obtenerDatosContacto();
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

  obtenerDatosContacto(){
    //Obtenemos los datos del usuario
    this.db.fetchContactoEmergencia().subscribe(data => {
      this.datosUsuario = data;
      //Asignamos los datos a las variables del formulario
      this.nombre = this.datosUsuario.nombres;
      this.apellido_p = this.datosUsuario.apellido_p;
      this.apellido_m = this.datosUsuario.apellido_m;
      this.correo = this.datosUsuario.email;
      this.telefono = this.datosUsuario.telefono;
      this.direccion = this.datosUsuario.direccion;
      this.imgPerfil = this.datosUsuario.img_url;
    });
  }

  cancelarCambios(){
    this.esEditable = false;
    this.obtenerDatosContacto();
  }

  //Función que toma la foto del usuario
  tomarFoto(){
    this.camara.takePicture()
    .then((img) => {
      //Guardamos la imagen en el objeto nuevoUsuario
      this.imgPerfil = img;
    })
  }

  async guardarCambios(){
    if(this.nombre == "" || this.apellido_p == "" || this.apellido_m == "" || this.correo == "" || this.telefono == "" || this.direccion == ""){
      this.alert.mostrar('Error', 'Los campos no pueden estar vacios');
      return;
    }

    //Validamos que los campos de nombre y apellidos no contengan números
    const noNumbersRegex = /^[^\d]+$/;
    if(!noNumbersRegex.test(this.nombre) || !noNumbersRegex.test(this.apellido_p) || !noNumbersRegex.test(this.apellido_m)){
      this.alert.mostrar('Error', 'Los campos de nombre y/o apellidos no pueden contener números');
      return;
    }

    //Validamos que el correo sea valido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(this.correo)){
      this.alert.mostrar('Error', 'El correo no es valido');
      return;
    }

    //Validamos que el telefono sea valido
    const chilePhoneRegex = /^\+569\d{8}$/;
    if(!chilePhoneRegex.test(this.telefono)){
      this.alert.mostrar('Error', 'El telefono no es valido');
      return;
    }

    //Validamos que la dirección no contenga caracteres especiales
    const noSpecialCharsRegex = /^[a-zA-Z0-9\s.]+$/;
    if(!noSpecialCharsRegex.test(this.direccion)){
      this.alert.mostrar('Error', 'La dirección no puede contener caracteres especiales');
      return;
    }

    //Cambiamos el estado de los campos a no editables
    this.editarCampos();

    //Si pasa todas las validaciones, entonces actualizamos los datos
    this.db.actualizarContactoEmergencia(this.nombre, this.apellido_p, this.apellido_m, this.correo, this.telefono, this.direccion, this.imgPerfil)
      
  }

  //Metodo que muestra el modal de emergencia
  verContactoEmergecia(){
    this.db.buscarContactoEmergencia()
    .then( status => {
      if(status){
        //Redirigimos a la pagina de contacto de emergencia
        this.router.navigate(['/autocuidado/contacto-emergencia']);
      }else{
        //Formulario para agregar un contacto de emergencia
        
      }
    })
    .catch(error => {
      this.alert.mostrar('Error contacto de emergencia:', JSON.stringify(error));
    });
  }

  eliminarContacto(){
    this.db.eliminarContactoEmergencia()
    .then(() => {
      this.router.navigate(['/perfil']);
    })
  }

}
