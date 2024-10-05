import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //arreglo para el usuario que se registra
  nuevoUsuario!: any;

  //Variables que almacenan los datos de acceso
  email!: string;
  password!: string;

  constructor(private router: Router, private alert:AlertsService, private activatedroute: ActivatedRoute, private db: DatabaseService, private nativeStorage: NativeStorage) {
    //Capturamos la información de NavigationExtras
    this.activatedroute.queryParams.subscribe(params => {
      //Validamos si viene o no información desde la pagina
      if(this.router.getCurrentNavigation()?.extras.state){
        //Capturamos la información
        this.nuevoUsuario = this.router.getCurrentNavigation()?.extras?.state?.['nuevoUsuario']
      }
    });
  }

  ngOnInit() { }

  validarLogin() {
    //Validaciones de formato (Correo)
    if(!this.email.includes("@")) { 
      this.alert.mostrar("Correo Electronico invalido", "Por favor, ingrese sus datos nuevamente");
      return;
    }

    this.db.isDBReady.subscribe(async (val) => {
      //Validar que la base de datos esté lista
      if(val) {
        //Validar que el usuario exista y lo guarda en un Observable
        await this.db.iniciarSesion(this.email, this.password);
        //Obtener el usuario actual
        this.db.fetchUsuarioActual().subscribe(res => {
          //Validar que el usuario exista (0 es el valor por defecto)
          if(res.id_usuario > 0) {
            switch(res.id_tipo_usuario) {
              case 1: 
              //Si es un usuario 'Autocuidado'
                this.router.navigate(['/autocuidado/menu-principal']);
                break;
              
              case 2:
                //Si es un usuario 'Soporte'
                this.router.navigate(['/soporte/menu-principal']);
                break;
            }            
          } else {
            //Mostrar mensaje de error
            this.alert.mostrar("Error de autenticación", "Usuario o contraseña incorrectos");
          }
        });
      }
    });
  }
}
