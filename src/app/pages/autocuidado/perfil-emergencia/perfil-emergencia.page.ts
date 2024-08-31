import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-emergencia',
  templateUrl: './perfil-emergencia.page.html',
  styleUrls: ['./perfil-emergencia.page.scss'],
})
export class PerfilEmergenciaPage implements OnInit {

  myVar:boolean=true;
  campos:any = [
    {
      label_input: "Nombre",
      dato_usuario: "Jorge"
    },
    {
      label_input: "Apellido paterno",
      dato_usuario: "Gonzalez"
    },
    {
      label_input: "Apellido materno",
      dato_usuario: "Jalero"
    },
    {
      label_input: "Correo electronico",
      dato_usuario: "JorgeGonJales@gmail.com"
    },
    {
      label_input: "Telefono",
      dato_usuario: 912345678
    },
    {
      label_input: "Comuna de residencia",
      dato_usuario: "Conchali"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  editarCampos() {
    this.myVar=!this.myVar;
  }

}
