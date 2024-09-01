import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-opciones-cliente',
  templateUrl: './opciones-cliente.page.html',
  styleUrls: ['./opciones-cliente.page.scss'],
})
export class OpcionesClientePage implements OnInit {

  constructor(private menucontroller: MenuController, private alertcontroller: AlertController) { }

  ngOnInit() {
    this.menucontroller.enable(true, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
  }

  //cambiar contraseña
  deshabilitarUsuario() {
    this.alerta('Deshabilitar usuario', '¿Está seguro que desea deshabilitar su usuario?');
  }

  async alerta(titulo: string, mensaje: string) {
    const alert = await this.alertcontroller.create({
      header: titulo,
      message: mensaje,
      buttons: ['Cancelar', 'Aceptar']
    });

    await alert.present();
  }

}