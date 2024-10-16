import { Injectable } from '@angular/core';
import { Alarma } from '../models/alarma';
import { AlertsService } from './alerts.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AlarmaService {

  constructor(private alert:AlertsService, private db:DatabaseService) { }

  //Función que crea la alarmas
  public crearAlarmas(id_indicacion: number, cantidadMedicamento: number, horasMedicamento: number, diasMedicamento: number, fechaInicio: string) {
    //Proceso para crear las alarmas

    //Arreglo que guardará las alarmas
    const alarmas: Alarma[] = [];

    //Fecha de inicio de la alarma
    let fechaAlarma = new Date(fechaInicio);

    //Fecha final de la alarma (fecha de inicio + días recetados)
    let fechaFinal = new Date(fechaInicio);
    fechaFinal.setHours(fechaFinal.getHours() + 24 * diasMedicamento);

    //Ciclo que crea las alarmas mientras la fecha de la alarma sea menor a la fecha final
    while (fechaAlarma <= fechaFinal) {
      const alarma: Alarma = {
        id_alarma: 0, //No se usa en el insert
        id_indicacion: id_indicacion,
        fecha_hora: this.obtenerTiempo(fechaAlarma),
        status: false,
        medicamentoNombre: 'Some text', //No se usa en el insert
        indicacionDosis: cantidadMedicamento //No se usa en el insert
      }
      alarmas.push(alarma);
      fechaAlarma.setHours(fechaAlarma.getHours() + horasMedicamento);
    }
    this.alert.mostrar('Alarmas', JSON.stringify(alarmas));
    this.db.registrarAlarmas(alarmas);
  }

  //Funcion para obtener la fecha y hora
  private obtenerTiempo(date:Date):string{
    return (date.getFullYear().toString() + '-' 
      + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
      + ("0" + (date.getDate())).slice(-2))
      + 'T' + date.toTimeString().slice(0,5);
  }

}
