import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  
  campoVisible:string = "true";
  nombre:string = "Maria";
  apellidoP:string = "Lopez";
  apellidoM:string = "Villa";
  telefono:number = 932556762;
  comuna:string = "Lo espejo";
  correo:string = "lovely.marie@gmail.com";

  constructor() { }

  ngOnInit() {
  }

  hacerCamposVisibles(){
    this.campoVisible = "false";
  }

}
