import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-agregar-medicamento',
  templateUrl: './agregar-medicamento.page.html',
  styleUrls: ['./agregar-medicamento.page.scss'],
})
export class AgregarMedicamentoPage implements OnInit {

  nombre_med!:string;
  formato_med!:number;

  constructor(private db:DatabaseService, private alerts:AlertsService, private menucontroller:MenuController) { }

  ngOnInit() {
    this.menucontroller.enable(true, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
  }

  agregarMedicamento(){
    if(this.nombre_med == "" || this.nombre_med == undefined){
      this.alerts.mostrar("Error", "El nombre del medicamento no puede estar vacio");
      return;
    }

    else if(this.formato_med == undefined){
      this.alerts.mostrar("Error", "El gramaje del medicamento no puede estar vacio");
      return;
    }

    this.db.registrarMedicamento(this.nombre_med, this.formato_med);

  }


}