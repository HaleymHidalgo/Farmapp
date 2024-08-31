import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  //Arreglo con los datos de un usuario 'Autocuidado'
  usuario_auto: any = {
    nombre: "Haleym",
    apellido_p: "Hidalgo",
    apellido_m: "Torres",
    email:"haleym@mail.com",
    telefono:"+56987654321",
    direccion:"El arbol 123. Comuna",
    imgPerfil:"haleym.png",
    password: "123",
    rol: "autocuidado"
  };

  constructor(private menucontroller: MenuController) { }

  ngOnInit() {
    this.menucontroller.enable(false, 'soporte');
    this.menucontroller.enable(true, 'autocuidado');
  }

}
