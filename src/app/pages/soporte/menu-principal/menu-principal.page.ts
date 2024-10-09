import { Component, inject, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  listaDeUsuarios!: any;

  constructor(private menucontroller: MenuController, private db:DatabaseService) { }

  ngOnInit() {
    this.menucontroller.enable(true, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
    this.db.obtenerListadoUsuarios();
    this.listaDeUsuarios = this.db.fetchListadoUsuarios();
  }

}
