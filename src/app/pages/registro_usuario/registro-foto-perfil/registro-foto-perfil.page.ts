import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Camera } from '@capacitor/camera';
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

  //Variables del formulario
  imgPerfil!: string;

  img: any;

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

  ngOnInit() {
    Camera.requestPermissions();
  }

  //Función que se ejecuta al presionar el botón de camara
  

  //Función que se ejecuta al presionar el botón de galeria


  //Función que registra a un usuario
  async registrarUsuario() {
    //Si pasa las validaciones, entonces guarda los datos
    this.nuevoUsuario.id_tipo_usuario = 1;

    //se espera la url
    await this.camara.tomarFoto();




    //Registramos al usuario en la base de datos
    //this.db.registrarUsuario(this.nuevoUsuario);


    //Redirecciona al siguiente formulario
    //this.router.navigate(['/autocuidado/menu-principal']);
  }
}
