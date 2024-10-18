import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { AlertsService } from './alerts.service';
import { readTask } from 'ionicons/dist/types/stencil-public-runtime';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  constructor(private alerts:AlertsService) { }

  //-------------> Metodos Publicos del servicio <-------------
  public takePicture(){
    return new Promise<any>((resolve, reject) => {
      //Tomamos la foto
      Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      })
      //Si se tomo la foto, la guardamos
      .then(photo => {
        resolve(photo.webPath);
      })
      //Si hubo un error al tomar la foto, mostramos un mensaje
      .catch(error => {
        this.alerts.mostrar('Error al tomar foto: ', JSON.stringify(error));
        reject(JSON.stringify(error));
      })
    })
    
  }
}