import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Camera } from '@capacitor/camera';
import { ContactoEmergencia } from 'src/app/core/models/contacto-emergencia';
import { Usuario } from 'src/app/core/models/usuario';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { CamaraService } from 'src/app/core/services/camara.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-registro-foto-perfil',
  templateUrl: './registro-foto-perfil.page.html',
  styleUrls: ['./registro-foto-perfil.page.scss'],
})
export class RegistroFotoPerfilPage implements OnInit {
  //Variable para el nuevo usuario
  nuevoUsuario!: Usuario;

  //Obtener Rol actual
  rolActual!: number;

  constructor(private router: Router, private activatedroute: ActivatedRoute,private db: DatabaseService, private camara:CamaraService, private alert:AlertsService) {
    //Capturamos la información de NavigationExtras
    this.activatedroute.queryParams.subscribe(params => {
      //Validamos si viene o no información desde la pagina
      if(this.router.getCurrentNavigation()?.extras.state){
        //Capturamos la información
        this.nuevoUsuario = this.router.getCurrentNavigation()?.extras?.state?.['nuevoUsuario']
      }
    });
  }

  async ngOnInit() {
    //Obtenemos el rol actual
    await this.db.fetchUsuarioActual().subscribe(data => this.rolActual = data.id_tipo_usuario);
    //Obtenemos los permisos de la cámara
    await Camera.requestPermissions();
  }

  //Función que toma la foto del usuario
  tomarFoto(){
    this.camara.takePicture()
    .then((imgUrl) => {
      //Guardamos la imagen en el objeto nuevoUsuario
      this.nuevoUsuario.img_url = imgUrl;
      //Ejecutamos la función registrarUsuario
      this.registrarUsuario();
    })
  }

  //registrarUsuario
  async registrarUsuario(){
    //Añadimos el rol de usuario
    this.nuevoUsuario.id_tipo_usuario = 1;

    //Registramos al usuario en la base de datos
    if(this.rolActual == 0){
      await this.db.registrarUsuario(this.nuevoUsuario).then(() => {
        //Redirecciona al menu principal
        this.router.navigate(['/autocuidado/menu-principal']);
      });
    }
    else if(this.rolActual == 1){
      let contacto: ContactoEmergencia = {
        id_contacto: this.nuevoUsuario.id_usuario,
        nombres: this.nuevoUsuario.nombre,
        apellido_p: this.nuevoUsuario.apellido_p,
        apellido_m: this.nuevoUsuario.apellido_m,
        direccion: this.nuevoUsuario.direccion,
        email: this.nuevoUsuario.email,
        telefono: this.nuevoUsuario.telefono,
        img_url: this.nuevoUsuario.img_url
      }
      await this.db.registrarContactoEmergencia(contacto).then(() => {
        //Redirecciona al menu principal
        this.router.navigate(['/autocuidado/perfil-emergencia']);
      });
    }
  }
}
