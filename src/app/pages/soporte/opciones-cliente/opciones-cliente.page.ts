import { JsonPipe } from '@angular/common';
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

  id_usuario!: number;
  nombre!: string;
  apellido_p!: string;

  constructor(private menucontroller: MenuController, private alertcontroller: AlertController, private router: Router, private db:DatabaseService, private alerts:AlertsService) { }

  ngOnInit() {
    this.db.fetchCredencialesUsuario().subscribe(data => {
      this.id_usuario = data.id_usuario;
      this.nombre = data.nombre;
      this.apellido_p = data.apellido_p;
    });
    this.menucontroller.enable(true, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
  }

  cargarUsuario(){
    this.db.obtenerCredencialesUsuario(this.id_usuario);
    this.router.navigate(['/soporte/cambiar-password']);
  }

  
  deshabilitarUsuario() {
    this.db.cambiarEstadoUsuario(this.id_usuario, false)
    .then(() => {
      this.alerts.mostrar('Usuario deshabilitado', 'El usuario ha sido deshabilitado correctamente');
      this.router.navigate(['/soporte/menu-principal']);
    });
  }

  rehabilitarUsuario() {
    this.db.cambiarEstadoUsuario(this.id_usuario, true)
    .then(() => {
      this.alerts.mostrar('Usuario rehabilitado', 'El usuario ha sido rehabilitado correctamente');
      this.router.navigate(['/soporte/menu-principal']);
    });
  }

}