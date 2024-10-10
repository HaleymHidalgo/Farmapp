import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private menucontroller: MenuController, private db:DatabaseService, private alerts:AlertsService, private router:Router) {
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

  async cargarDetallesUsuario(id_usuario: number){
    this.db.obtenerCredencialesUsuario(id_usuario);
    this.router.navigate(['/soporte/pregunta-seguridad'])
  }
  
  ver(){
    this.alerts.mostrar('Lista: ', JSON.stringify(this.listadoUsuarios))
  }
}
