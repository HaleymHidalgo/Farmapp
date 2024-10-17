import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Alarma } from 'src/app/core/models/alarma';
import { Usuario } from 'src/app/core/models/usuario';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';
import { BackgroundRunner } from '@capacitor/background-runner';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { AlarmaService } from 'src/app/core/services/alarma.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})

export class MenuPrincipalPage implements OnInit, OnDestroy {
  //Dato background
  dato!: any;

  //arreglo donde se guarda la data del usuario
  usuario!: Usuario;
  
  //arreglo donde se guarda la data de las alarmas
  alarmas: Alarma[] = [];

  verAlarma:boolean = false;

  constructor(private router: Router, private menucontroller: MenuController, private alert:AlertsService, private db:DatabaseService, private alarmaService:AlarmaService) { 

  }

  ngOnInit() {
    //Desactivamos el menu de soporte y activamos el de autocuidado
    this.menucontroller.enable(false, 'soporte');
    this.menucontroller.enable(true, 'autocuidado');

    //Obtenemos la data del usuario
    this.db.fetchUsuarioActual().subscribe( usr => {
      this.usuario = usr;
    });

    //Obtenemos las alarmas del dia
    this.db.obtenerAlarmas(this.usuario.id_usuario, this.obtenerTiempoActual().slice(0,10))
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

  ngOnDestroy(){
    //Liberamos la memoria
    //usuario.unsubscribe();
  }

  nuevaAlarma(){
    //Redireccionamos a la pagina agregar-alarma
    this.router.navigate(['/autocuidado/alarma-medicamento']);
  }

  verDetalles(){
    this.verAlarma=!this.verAlarma;
  }

  //Funcion para obtener la fecha y hora actual
  obtenerTiempoActual():string{
    let date = new Date();
    return (date.getFullYear().toString() + '-' 
      + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
      + ("0" + (date.getDate())).slice(-2))
      + 'T' + date.toTimeString().slice(0,5);
  }

  //-------------------- Background API --------------------
}
