import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-opciones-cliente',
  templateUrl: './opciones-cliente.page.html',
  styleUrls: ['./opciones-cliente.page.scss'],
})
export class OpcionesClientePage implements OnInit {

  nombre!: string;
  apellido_p!: string;

  constructor(private menucontroller: MenuController, private alertcontroller: AlertController, private router: Router, private db:DatabaseService, private alerts:AlertsService) { }

  ngOnInit() {

    this.actualizarCredencialesUsuario();

    this.menucontroller.enable(true, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
  }

  async actualizarCredencialesUsuario(){
    this.db.fetchCredencialesUsuario().subscribe(data => {
      this.alerts.mostrar('Datos: ', JSON.stringify(data));
      this.nombre = data.nombre;
      this.apellido_p = data.apellido_p;
    });
  }

  //cambiar contraseña
  deshabilitarUsuario() {
  }

}