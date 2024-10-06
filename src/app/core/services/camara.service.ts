import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  private path = 'Farmapp';

  constructor(private alerts:AlertsService) {
    
  }

  //-----> Permisos de la camara <-----
  /*
  verificarPermisos(){
    Camera.checkPermissions().then( res => {
      if(res.camera === 'granted'){z
        this.alerts.mostrar('Permisos', 'Permisos de la camara concedidos');
      } else {
        this.solicitarPermisos();
      }
    })
  }

  solicitarPermisos(){
    Camera.requestPermissions(permissions?: CameraPluginPermissions | undefined)
    .then( res => {
      if(res.camera === 'granted'){
        this.alerts.mostrar('Permisos', 'Permisos de la camara concedidos');
      } else {
        this.alerts.mostrar('Permisos', 'Permisos de la camara denegados');
      }
    })
  }
  */

  //-------------> Metodos Publicos del servicio <-------------
  public takePicture(){
    return new Promise<string>((resolve, reject) => {
      //Tomamos la foto
      Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      })
      //Si se tomo la foto, la guardamos
      .then(photo => {
        this.savePicture(photo.base64String!)
        //Si se guardo con exito, devolvemos la url
        .then(url => {
          resolve(url);
        })
        //Si hubo un error al guardar la foto, mostramos un mensaje
        .catch(error => {
          this.alerts.mostrar('Error al guardar foto: ', JSON.stringify(error));
          reject(JSON.stringify(error));
        });
      })
      //Si hubo un error al tomar la foto, mostramos un mensaje
      .catch(error => {
        this.alerts.mostrar('Error al tomar foto: ', JSON.stringify(error));
        reject(JSON.stringify(error));
      })
    })
    
  }

  public obtenerFoto(imgUrl: string){
    return new Promise<string>((resolve, reject) => {
      //Obtenemos la foto
      Filesystem.readFile({
        path: imgUrl,
        directory: Directory.Documents
      })
      .then( img => {
        resolve('data:image/jpeg;base64,' + img.data);
      })
      .catch( error => {
        this.alerts.mostrar('Error al obtener foto', JSON.stringify(error));
        reject(JSON.stringify(error));
      });
    });
  }

  //-----------------> Metodos Privados del servicio <----------------
  private savePicture(photo: string){
    return new Promise<string>(async (resolve, reject) => {

      //Creamos el directorio si no existe
      await this.crearDirectorio();

      //Creamos el nombre del archivo
      const fileName = this.path + "/perfil_" + Date.now() + '.jpeg';

      //Guardamos la foto en el sistema de archivos
      Filesystem.writeFile({
        path: fileName,
        data: photo,
        directory: Directory.Documents
      })
      //Si se guardo con exito, devolvemos el nombre del archivo
      .then( () => {
        resolve( fileName);
      })
      //Si hubo un error, devolvemos el error
      .catch(error => {
        reject(JSON.stringify(error));
      });
    });
  }

  //Creamos el directorio de las fotos
  private crearDirectorio(){
    //Verificamos si existe el directorio
    Filesystem.readdir({
      path: this.path,
      directory: Directory.Documents
    })
    //Si no existe, lo creamos
    .catch( () => {
      Filesystem.mkdir({
        path: this.path,
        directory: Directory.Documents,
      })
    })
    //Si al crear el directorio hubo un error, mostramos un mensaje
    .catch( error => this.alerts.mostrar('Error al crear directorio', JSON.stringify(error)));
  }

//-----------------> Metodos Old <----------------
/*
  //metodo para tomar una foto
  public tomarFoto(){
    //Obtenemos la foto
    Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      allowEditing: false
    })
    //Si se obtuvo la foto, la guardamos en el sistema de archivos
    .then( img => {
        this.guardarFoto(img.base64String!)
        //Si se guardo con exito, devolvemos la url
        .then( imgUrl => {
          return imgUrl;
        })
        //Si hubo un error al guardar la foto, mostramos un mensaje
        .catch( error => {
          this.alerts.mostrar('Error al guardar foto', JSON.stringify(error));
          return null;
        });
    })
    //Si hubo un error al obtener la foto, mostramos un mensaje
    .catch( error => {
      //Si no se pudo obtener la foto, mostramos un mensaje
      this.alerts.mostrar('Error al tomar foto', JSON.stringify(error));
      return null;
    });
  }

//---------> Metodos privados del servicio <---------
  
//Guardamos la foto en el sistema de archivos
  private async guardarFoto(foto: string){
    //Creamos el directorio si no existe
    await this.crearDirectorio();

    //creamos la url de la foto
    let imgUrl:string = this.path + '/perfil_' + Date.now() + '.jpeg';

    //Guardamos la foto en el sistema de archivos
    await Filesystem.writeFile({
      path: imgUrl,
      data: foto,
      directory: Directory.Documents,
    })
    //Si hubo un error, mostramos un mensaje
    .catch( error => {
      this.alerts.mostrar('Error al guardar foto', JSON.stringify(error))
      return null;
    });
    
    //Si se guardo con exito, devolvemos la url
    return imgUrl;
  }
  */
}
