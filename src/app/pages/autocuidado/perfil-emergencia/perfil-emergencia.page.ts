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
      nombre: "Chad",
      apellidoP: "Giga",
      apellidoM: "Gonzalez",
      correo: "perfectman@gmail.com",
      telefono: 912345678,
      comuna: "Conchali"
    },
  ]

  constructor() { }

  ngOnInit() {
  }

  editarCampos() {
    this.myVar=!this.myVar;
  }

}
