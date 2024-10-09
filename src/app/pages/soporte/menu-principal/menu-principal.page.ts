import { Component, inject, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ListadoUsuarios } from 'src/app/core/models/listado-usuarios';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  listaDeUsuarios:ListadoUsuarios[];

  constructor(private menucontroller: MenuController, private db:DatabaseService, private alerts:AlertsService) {
    this.db.obtenerListadoUsuarios();
    this.listaDeUsuarios = this.db.fetchListadoUsuarios();
  }

  ngOnInit() {
    this.menucontroller.enable(true, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
  }

  

}
