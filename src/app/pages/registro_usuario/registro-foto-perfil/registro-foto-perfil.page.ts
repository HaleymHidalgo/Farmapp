import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-registro-foto-perfil',
  templateUrl: './registro-foto-perfil.page.html',
  styleUrls: ['./registro-foto-perfil.page.scss'],
})
export class RegistroFotoPerfilPage implements OnInit {
  //Variable para el nuevo usuario
  nuevoUsuario!: any;

  //Variables del formulario
  imgPerfil!: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  //Función que se ejecuta al presionar el botón de continuar
  siguienteFormulario() {
    //Si el usuario no ingreso valores en los inputs o los dejo vacios

    //Validación de formatos

    //Si pasa las validaciones, entonces guarda los datos
    this.nuevoUsuario.imgPerfil = this.imgPerfil;

    //Preparamos la data para enviarla a la siguiente pagina
    let navigationextras: NavigationExtras = {
      state: {
        nuevoUsuario: this.nuevoUsuario
      }
    }

    //Redirecciona al siguiente formulario
    this.router.navigate(['/'], navigationextras);
  }
}
