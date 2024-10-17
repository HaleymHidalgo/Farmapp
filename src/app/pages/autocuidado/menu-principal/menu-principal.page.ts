import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Alarma } from 'src/app/core/models/alarma';
import { Usuario } from 'src/app/core/models/usuario';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';
import { AlarmaService } from 'src/app/core/services/alarma.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})

export class MenuPrincipalPage implements OnInit {
  //Objeto donde se guarda la data del usuario
  usuario!: Usuario;
  
  //Variable que indica que dia de la semana se selecciono
  diaSeleccionado!: number;

  //arreglo donde se guarda la data de las alarmas
  alarmas: Alarma[] = [];

  verAlarma:boolean = false;

  constructor(private router: Router, private menucontroller: MenuController, private alert:AlertsService, private db:DatabaseService, private alarmaService:AlarmaService) { 

  }

  ngOnInit() {
    //Desactivamos el menu de soporte y activamos el de autocuidado
    this.menucontroller.enable(false, 'soporte');
    this.menucontroller.enable(true, 'autocuidado');

    //Definimos el dia seleccionado como el dia actual
    this.diaSeleccionado = new Date().getDay();

    //Obtenemos la data del usuario
    this.db.fetchUsuarioActual().subscribe( usr => {
      this.usuario = usr;
    });

    
    //Obtenemos la fecha en formato yyyy-mm-dd
    let date = this.alarmaService.obtenerTiempo(new Date()).slice(0,10);
    //Obtenemos las alarmas del dia
    this.db.obtenerAlarmas(this.usuario.id_usuario, date)
    .then (data => {
      this.alarmas = data;
      
      //Crear notificaciones del dia
      this.alarmaService.verificarPermisos().then( res => {
        if(!res) return
        this.alarmaService.crearNotificaciones(this.alarmas)
        .catch(error => this.alert.mostrar('Error al crear notificaciones', JSON.stringify(error)));
      });
    });
  }

  nuevaAlarma(){
    //Redireccionamos a la pagina agregar-alarma
    this.router.navigate(['/autocuidado/alarma-medicamento']);
  }

  verDetalles(){
    this.verAlarma=!this.verAlarma;
  }

  cambioDia(event:any){
    //event.detail.value contiene el dia seleccionado
    let diaEvento = event.detail.value;
    let diaActual = new Date().getDay();

    let fechaBuscar = new Date();
    
    //Si el dia seleccionado es menor al dia actual
    if(diaEvento < diaActual){
      fechaBuscar.setDate(fechaBuscar.getDate() - (diaActual - diaEvento));
    }
    //Si el dia seleccionado es mayor al dia actual
    else if(diaEvento > diaActual){
      fechaBuscar.setDate(fechaBuscar.getDate() + (diaEvento - diaActual));
    }

    //Obtenemos la fecha en formato yyyy-mm-dd
    let date = this.alarmaService.obtenerTiempo(fechaBuscar).slice(0,10);
    this.db.obtenerAlarmas(this.usuario.id_usuario, date)
    .then (data => {
      this.alarmas = data;
    });

    //Mostramos un mensaje con el dia seleccionado y la fecha correspondiente
    //this.alert.mostrar('Dia seleccionado', 'Dia seleccionado: ' + diaEvento + ' corresponde a: ' + fechaBuscar.toDateString());
  }
}