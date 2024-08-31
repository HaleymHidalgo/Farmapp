import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  //Arreglo con los datos de un usuario 'Soporte'
  usuario_soporte: any = {
    nombre: "Dondup",
    apellido_p: "Berrios",
    apellido_m: "Perez",
    email:"dondup@gmail.com",
    telefono:"+56987654321",
    direccion:"El arbol 123. Comuna",
    imgPerfil:"haleym.png",
    password: "123",
    rol: "soporte"
  };

  constructor(private menucontroller: MenuController) { }

  ngOnInit() {
    this.menucontroller.enable(true, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
  }

}
