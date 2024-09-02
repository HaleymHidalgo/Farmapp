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
      dato_usuario: "Dondup"
    },
    {
      label_input: "Apellido paterno",
      dato_usuario: "Berrios"
    },
    {
      label_input: "Apellido materno",
      dato_usuario: "Perez"
    },
    {
      label_input: "Correo electronico",
      dato_usuario: "dondup@mail.com"
    },
    {
      label_input: "Telefono",
      dato_usuario: 987654321
    },
    {
      label_input: "Direccion",
      dato_usuario: "El arbol 123. Comuna"
    }
  ];

  constructor(private menucontroller: MenuController) { }

  ngOnInit() {
    this.menucontroller.enable(true, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
  }

  editarCampos() {
    this.myVar=!this.myVar;
  }

}
