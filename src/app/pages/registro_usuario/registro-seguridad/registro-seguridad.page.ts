import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { PreguntaSeguridad } from 'src/app/core/models/pregunta-seguridad';
import { Usuario } from 'src/app/core/models/usuario';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-registro-seguridad',
  templateUrl: './registro-seguridad.page.html',
  styleUrls: ['./registro-seguridad.page.scss'],
})
export class RegistroSeguridadPage implements OnInit {
  //Variable para el nuevo usuario
  nuevoUsuario!: Usuario;

  //Variables del formulario
  listaPreguntas!: PreguntaSeguridad[];

  idPregunta!: number;
  respuesta!: string;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private alert:AlertsService, private db: DatabaseService, private menucontroller: MenuController) {
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
    await this.db.obtenerPreguntasSeguridad();
    await this.db.fetchPreguntasSeguridad().subscribe(data => {
      this.listaPreguntas = data;
    });
    this.menucontroller.enable(false, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
  }

  //Guardar variable medicamento
  obtenerPregunta(e: any) {
    this.idPregunta = e.detail.value;
  }

  //Función que se ejecuta al presionar el botón de continuar
  siguienteFormulario() {
    //Validamos que los campos no esten vacios
    if(this.respuesta === undefined || this.respuesta === "" || this.idPregunta === undefined){
      this.alert.mostrar("Campos vacios","Debe responder a una pregunta de seguridad");
      return;
    }

    //Si pasa las validaciones, entonces guarda los datos
    this.nuevoUsuario.id_pregunta = this.idPregunta;
    this.nuevoUsuario.res_seguridad = this.respuesta;
    this.nuevoUsuario.activo = true;

    //Preparamos la data para enviarla a la siguiente pagina
    let navigationextras: NavigationExtras = {
      state: {
        nuevoUsuario: this.nuevoUsuario
      }
    }

    //Redirecciona al siguiente formulario
    this.router.navigate(['/registro-foto-perfil'], navigationextras);
  }

}
