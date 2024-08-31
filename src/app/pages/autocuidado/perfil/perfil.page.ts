import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  //Arreglo con los datos de un usuario 'Autocuidado'

  myVar:boolean=true;
  campos:any = [
    {
      label_input: "Nombre",
      dato_usuario: "Haleym"
    },
    {
      label_input: "Apellido paterno",
      dato_usuario: "Hidalgo"
    },
    {
      label_input: "Apellido materno",
      dato_usuario: "Torres"
    },
    {
      label_input: "Correo electronico",
      dato_usuario: "haleym@mail.com"
    },
    {
      label_input: "Telefono",
      dato_usuario: 987654321
    },
    {
      label_input: "Comuna de residencia",
      dato_usuario: "El arbol 123. Comuna"
    }
  ];

  constructor(private menucontroller: MenuController) { }

  ngOnInit() {
    this.menucontroller.enable(false, 'soporte');
    this.menucontroller.enable(true, 'autocuidado');
  }

  editarCampos() {
    this.myVar=!this.myVar;
  }

}
