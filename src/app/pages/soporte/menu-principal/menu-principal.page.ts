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

  listadoUsuarios!:ListadoUsuarios[];

  constructor(private menucontroller: MenuController, private db:DatabaseService, private alerts:AlertsService) {
  }

  ngOnInit() {
    this.menucontroller.enable(true, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
    this.actualizarListadoUsuarios();
  }

  async actualizarListadoUsuarios(){
    this.db.fetchListadoUsuarios().subscribe(data => {
      this.listadoUsuarios = data;
    });
  }

  verDetallesUsuario(id_usuario: number){
    //this.db.abrirDetallesUsuario(id_usuario);
  }
  
  ver(){
    this.alerts.mostrar('Lista: ', JSON.stringify(this.listadoUsuarios))
  }
}
