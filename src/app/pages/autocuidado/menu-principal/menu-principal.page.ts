import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Alarma } from 'src/app/core/models/alarma';
import { Usuario } from 'src/app/core/models/usuario';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})

export class MenuPrincipalPage implements OnInit {
  //arreglo donde se guarda la data del usuario
  usuario!: Usuario;
  
  //arreglo donde se guarda la data de las alarmas
  alarmas: any = [];
  //new Date().toISOString().slice(0,10)

  verAlarma:boolean = false;

  constructor(private router: Router, private menucontroller: MenuController, private alert:AlertsService, private db:DatabaseService) { 
    //Obtenemos la data del usuario
    this.db.fetchUsuarioActual().subscribe( usr => {
      this.usuario = usr;
    })

    this.db.obtenerAlarmas(this.usuario.id_usuario, this.obtenerTiempoActual().slice(0,10))
    .then (data => {
      this.alarmas = data;
    });
  }

  ngOnInit() {
    this.menucontroller.enable(false, 'soporte');
    this.menucontroller.enable(true, 'autocuidado');
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

}
