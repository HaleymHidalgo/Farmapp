import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Router } from '@angular/router';
import { AlertsService } from './alerts.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlarmaService } from './alarma.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private db:DatabaseService, private router:Router, private alert:AlertsService, private storage:NativeStorage, private alarma:AlarmaService) { }

  public iniciarSesion(email: string, password: string) {
    //Proceso para iniciar sesión
    this.db.validarUsuario(email, password)
    .then(res => {
      if(res){
        this.db.fetchUsuarioActual().subscribe(data => {
          this.storage.setItem('usuario', data.id_usuario);
          if(data.id_tipo_usuario == 1){
            //Redirigimos al menú principal del cliente
            this.router.navigate(['/autocuidado/menu-principal']);
          }else if(data.id_tipo_usuario == 2){
            //Redirigimos al menú principal del soporte
            this.router.navigate(['/soporte/menu-principal']);
          }
        });
      }else {
        this.alert.mostrar('Error al iniciar sesión', 'Usuario o contraseña incorrectos');
      }
    })
  }

  public async cerrarSesion() {
    //Borramos la información del usuario del cache
    await this.storage.remove('usuario');

    //Borramos la información del usuario actual
    await this.db.eliminarSesion();

    //Borramos las notificaciones
    await this.alarma.borrarNotificaciones();

    //Redirigimos al login
    await this.router.navigate(['/login']);
  }

  public async obtenerSesion() {
    try {
      //Obtenemos el id del usuario del cache
      const id_usuario = await this.storage.getItem('usuario')
      
      //Obtenemos la información del usuario
      await this.db.obtenerUsuario(id_usuario)

      //Obtenemos la información del usuario actual
      await this.db.fetchUsuarioActual().subscribe(data => {
        this.storage.setItem('usuario', data.id_usuario);
        if(data.id_tipo_usuario == 1){
          //Redirigimos al menú principal del cliente
          this.router.navigate(['/autocuidado/menu-principal']);
        } else if (data.id_tipo_usuario == 2){
          //Redirigimos al menú principal del soporte
          this.router.navigate(['/soporte/menu-principal']);
        }
      });
    } catch (error) {
      this.alert.mostrar('Error al obtener sesión', JSON.stringify(error));
    }
  }
}