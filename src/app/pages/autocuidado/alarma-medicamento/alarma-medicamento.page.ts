import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicamento } from 'src/app/core/models/medicamento';
import { AlarmaService } from 'src/app/core/services/alarma.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-alarma-medicamento',
  templateUrl: './alarma-medicamento.page.html',
  styleUrls: ['./alarma-medicamento.page.scss'],
})
export class AlarmaMedicamentoPage implements OnInit {
  //Arreglo que guadara los datos del recipe
  recipe: any = {
    tramiento: undefined
  };

  //Arreglo que guardará los medicamentos
  listaMedicamentos: Medicamento[] = [];

  //Variables que se enviarán al siguiente formulario
  idMedicamento!: number;
  cantidadMedicamento!: number;
  horasMedicamento!: number;
  diasMedicamento!: number;
  fechaInicio!: string;

  constructor(private db: DatabaseService, private alert:AlertsService, private router: Router, private alarma: AlarmaService) {
    //Se obtienen los medicamentos de la base de datos
    this.db.obtenerMedicamentos().then(() => this.db.fetchMedicamentos().subscribe(data => this.listaMedicamentos = data));
    
  }

  ngOnInit() {
  }

  //Guardar variable medicamento
  obtenerMedicamento(e: any) {
    this.idMedicamento = e.detail.value;
  }

  //Función que se ejecuta al presionar el botón de continuar
  registrarIndicacion() {
    //Validar que los campos no estén vacíos
    if (this.idMedicamento == undefined || this.cantidadMedicamento == undefined || this.horasMedicamento == undefined || this.diasMedicamento == undefined || this.fechaInicio == undefined) {
      this.alert.mostrar('error', 'Faltan campos por llenar');
      return;
    }

    //Validar que la cantidad de dias sea mayor a 0
    if (this.diasMedicamento < 0) {
      this.alert.mostrar('error', 'La cantidad de días debe ser mayor a 0');
      return;
    }

    //validadar que la dosis sea mayor a 0
    if (this.cantidadMedicamento < 0) {
      this.alert.mostrar('error', 'La dosis debe ser mayor a 0 gr');
      return;
    }

    //Validar que la cantidad de horas sea mayor a 0
    if (this.horasMedicamento < 0) {
      this.alert.mostrar('error', 'La cantidad de horas debe ser mayor a 0');
      return;
    }
    
    //Validar que la fecha de inicio no esté vacía
    if (this.fechaInicio == "" ) {
      this.alert.mostrar('error', 'La fecha de inicio no puede estar vacía');
      return;
    }

    //validar que la fecha de inicio sea mayor a la fecha actual
    if (new Date(this.fechaInicio) < new Date()) {
      this.alert.mostrar('error', 'La fecha de inicio debe ser mayor a la fecha actual');
      return;
    }

    //Si todo está correcto, se registra la indicación
    this.db.registrarIndicacion(this.idMedicamento, this.cantidadMedicamento, this.horasMedicamento, this.diasMedicamento)
    .then(idIndicacion => {
      //Se crea la alarma
      this.alarma.crearAlarmas(idIndicacion, this.cantidadMedicamento, this.horasMedicamento, this.diasMedicamento, this.fechaInicio);
    });
    
    //Se redirecciona a la página principal
    this.router.navigate(['/autocuidado/menu-principal']);

  }

}