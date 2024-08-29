import { Component, OnInit } from '@angular/core';

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
  
  constructor() { }

  ngOnInit() {
  }

}
