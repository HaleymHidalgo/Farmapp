import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Alarma } from 'src/app/core/models/alarma';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {
  //arreglo donde se guarda la data del usuario
  usuario!: any;

  verAlarma:boolean = false;

  lista_alarmas!: Alarma[];

  constructor(private router: Router, private menucontroller: MenuController, private alert:AlertsService, private db:DatabaseService) {
    this.db.traerAlarmas();
    this.traerTodaAlarma();
  }

  ngOnInit() {
    this.menucontroller.enable(false, 'soporte');
    this.menucontroller.enable(true, 'autocuidado');
  }

  nuevaAlarma(){
    //Redireccionamos a la pagina agregar-alarma
    this.router.navigate(['/autocuidado/agregar-alarma']);
  }

  verDetalles(){
    this.verAlarma=!this.verAlarma;
  }

  traerTodaAlarma(){
    this.db.fetchAlarmas().subscribe(data=>{
      data.forEach(element => {
        this.lista_alarmas.push({
          id_indicacion : element.id_indicacion,
          fecha_hora : element.fecha_hora,
          status : element.status,
        });
      });
    });
  }

}
