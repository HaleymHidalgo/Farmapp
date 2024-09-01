import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //Usuario temporal para hacer validaciones
  //Arreglo con los datos de un usuario 'Autocuidado'
  usuario_auto: any = {
    nombre: "Haleym",
    apellido_p: "Hidalgo",
    apellido_m: "Torres",
    email:"haleym@gmail.com",
    telefono:"+56987654321",
    direccion:"El arbol 123. Comuna",
    imgPerfil:"haleym.png",
    password: "123",
    rol: "autocuidado"
  };

  //Arreglo con los datos de un usuario 'Autocuidado'
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

  //arreglo para el usuario que se registra
  nuevoUsuario!: any;

  //Variables que almacenan los datos de acceso
  email!: string;
  password!: string;

  constructor(private router: Router, private alertcontroller: AlertController, private activatedroute: ActivatedRoute) {
    //Capturamos la información de NavigationExtras
    this.activatedroute.queryParams.subscribe(params => {
      //Validamos si viene o no información desde la pagina
      if(this.router.getCurrentNavigation()?.extras.state){
        //Capturamos la información
        this.nuevoUsuario = this.router.getCurrentNavigation()?.extras?.state?.['nuevoUsuario']
      }
    });
  }
  
  ngOnInit() {
  }

  validarLogin() {
    //Validaciones de formato (Correo)
    if(!this.email.includes("@")) { 
      const titulo = "Correo Electronico invalido";
      const mensaje = "Por favor, ingrese sus datos nuevamente";
      this.alertaLogin(titulo, mensaje);
      return;
    }

    //Validar que el usuario y contraseña coincidan con los del usuario temporal
    if(this.email == this.usuario_auto.email && this.password == this.usuario_auto.password) {
      //Si el login es correcto, redireccionar a la lista de medicamentos (Pag. Principal)
      if(this.usuario_auto.rol == "autocuidado"){
        //Preparamos la data para enviarla a la siguiente pagina
        let navigationextras: NavigationExtras = {
          state: {
            nuevoUsuario: this.usuario_auto
          }
        }
        //Redireccionamos a la pag principal (autocuidado)
        this.router.navigate(['/autocuidado/menu-principal'], navigationextras);
      }
    }
    else if (this.email == this.usuario_soporte.email && this.password == this.usuario_soporte.password){
      if(this.usuario_soporte.rol == "soporte"){
        //Preparamos la data para enviarla a la siguiente pagina
        let navigationextras: NavigationExtras = {
          state: {
            nuevoUsuario: this.usuario_soporte
          }
        }
        //Redireccionamos a la pag principal (autocuidado)
        this.router.navigate(['/soporte/menu-principal'], navigationextras);
      }
    }
    else{
      //Si el login es incorrecto, mostrar una alerta de error
      const titulo = "Credenciales incorrectas";
      const mensaje = "Por favor, ingrese sus datos nuevamente";
      this.alertaLogin(titulo, mensaje);
    }
  }

  async alertaLogin(titulo:string , mensaje: string){
    const alert = await this.alertcontroller.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

}
