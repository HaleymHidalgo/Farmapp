import { Injectable } from '@angular/core';
import { Alarma } from '../models/alarma';
import { AlertsService } from './alerts.service';
import { DatabaseService } from './database.service';
import { ActionPerformed, LocalNotification, LocalNotifications, LocalNotificationSchema, ScheduleOptions } from '@capacitor/local-notifications';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlarmaService {

  constructor(private alert:AlertsService, private db:DatabaseService, private router:Router) { }

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
  public obtenerTiempo(date:Date):string{
    return (date.getFullYear().toString() + '-' 
      + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
      + ("0" + (date.getDate())).slice(-2))
      + 'T' + date.toTimeString().slice(0,5);
  }

  //Funcion para crear Acciones de Notificacion
  private crearAcciones(){
    //Definimos los tipos de acciones que se pueden realizar en las notificaciones
    LocalNotifications.registerActionTypes({
      types: [
        {
          id:'ALARMA_MEDICAMENTO',
          actions: [
            {
              id: 'CONFIRMAR',
              title: 'Tomada'
            },
            {
              id: 'IGNORAR',
              title: 'Ignorar',
              destructive: true
            }
          ]
        },
      ]
    })
    .catch(() => this.alert.mostrar("Error al registrar acciones", "Hubo un error al registrar las acciones"));
  }

  //Funcion para borrar todas las notificaciones
  public borrarNotificaciones(){
    //Obtenemos las notificaciones pendientes
    LocalNotifications.getPending().then(notificaciones => {
      //Recorremos las notificaciones y las borramos
      notificaciones.notifications.forEach(notificacion => {
        LocalNotifications.cancel({notifications: [{id: notificacion.id}]});
      });
    });
  }

  //Funcion para crear un listener de las notificaciones
  private crearListener(){
    //Añadir un listener para las acciones de las notificaciones
    LocalNotifications.addListener('localNotificationActionPerformed', (notificationAction: ActionPerformed) => {
      //Si la acción es confirmar
      if (notificationAction.actionId === 'CONFIRMAR') {
        //Actualizar la alarma en la base de datos
        this.db.cambiarEstadoAlarma(notificationAction.notification.extra.id_alarma)

        //Redirige a la pagina de alarmas
        this.router.navigate(['/autocuidado/menu-principal']);
      }
    });
  }

  //Funcion para crear notificaciones en el sistema
  public async crearNotificaciones(alarmas: Alarma[]) {
    const status = await this.verificarPermisos()

    if(!status) return

    //Creamos las acciones de las notificaciones
    await this.crearAcciones();

    //Borramos todas las notificaciones programadas
    await this.borrarNotificaciones();

    //Proceso para crear las notificaciones
    try {
      //Arreglo que guardará las notificaciones
      const notificaciones: LocalNotificationSchema[] = [];
      let i = 0;

      //Recorremos las alarmas y las agregamos al arreglo de notificaciones
      alarmas.forEach(alarma => {
        notificaciones.push({
          title: 'Farmapp',
          body: 'Recordatorio: ' + alarma.medicamentoNombre + ' ' + alarma.indicacionDosis + 'mg',
          id: i,
          ongoing: true,
          actionTypeId: 'ALARMA_MEDICAMENTO',
          schedule: { at: new Date(alarma.fecha_hora) },
          extra: { id_alarma: alarma.id_alarma }
        });
        i++;
      });

      //Definiendo las opciones de las notificaciones
      const options: ScheduleOptions = { notifications: notificaciones };
    
      //Programamos las notificaciones
      LocalNotifications.schedule(options);

    } catch(e){
      this.alert.mostrar("Error al crear notificaciones", JSON.stringify(e))
    }

    //Añadimos un listener para las acciones de las notificaciones
    this.crearListener();
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