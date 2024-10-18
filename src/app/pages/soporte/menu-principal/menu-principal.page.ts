import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { ListadoMedicamentos } from 'src/app/core/models/listado-medicamentos';
import { ListadoUsuarios } from 'src/app/core/models/listado-usuarios';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  viendoUsuarios:boolean = true;
  viendoMedicamentos:boolean = false;

  listadoUsuarios!:ListadoUsuarios[];
  listadoMedicamentos!:ListadoMedicamentos[];

  constructor(private menucontroller: MenuController, private db:DatabaseService, private alerts:AlertsService, private router:Router, private ns:NativeStorage) {}

  ngOnInit() {
    //Fetch para la lista de usuarios
    this.db.fetchListadoUsuarios().subscribe(data => {
      this.listadoUsuarios = data;
    });

    //fetch para la lista de medicamentos
    this.db.fetchListadoMedicamentos().subscribe(data => {
      this.listadoMedicamentos = data;
    });

    
    this.menucontroller.enable(true, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
  }

  async cargarDetallesUsuario(id_usuario: number){

    this.db.obtenerCredencialesUsuario(id_usuario);

    this.router.navigate(['/soporte/pregunta-seguridad']);
  }

  verUsuarios(){
    this.viendoUsuarios = true;
    this.viendoMedicamentos = false;
  }

  verMedicamentos(){
    this.viendoUsuarios = false;
    this.viendoMedicamentos = true;
  }

  async eliminarMedicamento(id_medicamento:number){
    this.db.eliminarMedicamento(id_medicamento);
  }
  
}
