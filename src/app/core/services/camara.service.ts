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

  //Nombre del directorio donde se guardaran las fotos
  private directorioFotos: string = 'fotos';

  constructor(private platform:Platform, private alerts:AlertsService) { }

  //metodo para tomar una foto
  public async tomarFoto(){
    //Obtenemos la foto
    const imgCamara = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      allowEditing: false
    });
    //Guadramos la foto en el sistema de archivos
    if(imgCamara){
      this.alerts.mostrar('Foto data', JSON.stringify(imgCamara));
      await this.guardarFoto(imgCamara);
    }
    //Retornamos la url de la foto
    //return data.filepath;
  }

//---------> Metodos privados del servicio <---------
  
//Guardamos la foto en el sistema de archivos
  private async guardarFoto(foto: any){
    let imagen = await foto.base64String;
    this.alerts.mostrar('Fotosaved', JSON.stringify(imagen));
    await Filesystem.writeFile({
      path: Date.now() + '.jpeg',
      data: foto,
      directory: Directory.Documents,
      //encoding: Encoding.UTF8
    })
    this.alerts.mostrar('Foto guardada', 'Se ha guardado la foto');
  }

}
