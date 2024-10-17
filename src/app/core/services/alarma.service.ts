import { Injectable } from '@angular/core';
import { Alarma } from '../models/alarma';
import { AlertsService } from './alerts.service';
import { DatabaseService } from './database.service';
import { LocalNotifications, LocalNotificationSchema, ScheduleOptions } from '@capacitor/local-notifications';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlarmaService {

  constructor(private alert:AlertsService, private db:DatabaseService) { }

  //Función que crea la alarmas
  public async crearAlarmas(id_indicacion: number, cantidadMedicamento: number, horasMedicamento: number, diasMedicamento: number, fechaInicio: string) {
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

    await this.db.registrarAlarmas(alarmas);
  }

  //Funcion para obtener la fecha y hora
  private obtenerTiempo(date:Date):string{
    return (date.getFullYear().toString() + '-' 
      + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
      + ("0" + (date.getDate())).slice(-2))
      + 'T' + date.toTimeString().slice(0,5);
  }

  //Funcion para crear notificaciones en el sistema
  public async crearNotificaciones(alarmas: Alarma[]) {
    this.verificarPermisos()
    .then( res => {
      if(!res) return

      //Borramos todas las notificaciones programadas
      try {
        //Obtenemos las notificaciones pendientes
        LocalNotifications.getPending().then(res => {
          //Recorremos las notificaciones y las borramos
          res.notifications.forEach(notificacion => {
            LocalNotifications.cancel({notifications: [{id: notificacion.id}]})
          });
        });
      } catch(e){
        this.alert.mostrar("Error al borrar notificaciones", JSON.stringify(e))
      }

      //Proceso para crear las notificaciones
      try {
        //Arreglo que guardará las notificaciones
        const notificaciones: LocalNotificationSchema[] = [];
        let i = 0;

        //Recorremos las alarmas y las agregamos al arreglo de notificaciones
        alarmas.forEach(alarma => {
          notificaciones.push({
            title: 'Farmapp',
            body: 'Recordatorio de medicamento: ' + alarma.medicamentoNombre + ' ' + alarma.indicacionDosis + ' gr',
            id: i,
            schedule: { at: new Date(alarma.fecha_hora) }
          });
          i++;
        });

        //Definiendo las opciones de las notificaciones
        const options: ScheduleOptions = { notifications: notificaciones };
      
        //Programamos las notificaciones
        LocalNotifications.schedule(options)

      } catch(e){
        this.alert.mostrar("Error al crear notificaciones", JSON.stringify(e))
      }
    })
    .catch(() => this.alert.mostrar("Error permisos", "Hubo un error al verificar los permisos"));
  };

  //Funcion para verificar los permisos de notificaciones
  public verificarPermisos() {
    return new Promise<boolean> (async (resolve, reject) => {
      const permisos = await LocalNotifications.checkPermissions()
      if (permisos.display !== 'granted') {
        await LocalNotifications.requestPermissions()
        resolve(true);
      } else if (permisos.display === 'granted') {
        resolve(true);
      }
      reject();
    });
  }
}