import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-opciones-cliente',
  templateUrl: './opciones-cliente.page.html',
  styleUrls: ['./opciones-cliente.page.scss'],
})
export class OpcionesClientePage implements OnInit {

  constructor(private menucontroller: MenuController, private alertcontroller: AlertController, private router: Router) { }

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
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'danger'
      },
      {
        text: 'Confirmar',
        role: 'ok',
        cssClass: 'success',
        handler: () => {
          this.router.navigate(['soporte/menu-principal']);
        }
      }]
    });

    await alert.present();
  }

}