import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //Usuario temporal para hacer validaciones
  usuario:any = {
    email: "hal.hidalgo@duocuc.cl",
    password: "haleym123",
    rol: "autocuidado"
  };

  //Variables que almacenan los datos de acceso
  email!: string;
  password!: string;

  constructor(private router: Router) { }
  
  ngOnInit() {
  }

  validarLogin() {
    //Validar que el usuario y contraseña coincidan con los del usuario temporal
    if(this.email == this.usuario.email && this.password == this.usuario.password) {
      //Si el login es correcto, redireccionar a la lista de medicamentos (Pag. Principal)
      if(this.usuario.rol == "autocuidado"){
        this.router.navigate(['/lista_medicamentos']);
      }else{
        //Si el login es correcto, redireccionar a la lista de personas_cuidadas (Pag. Principal)
      }
    }else{
      //Si el login es incorrecto, mostrar una alerta de error
    }
  }
}
