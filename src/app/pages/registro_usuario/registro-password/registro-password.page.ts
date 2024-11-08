import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/core/models/usuario';
import { AlertsService } from 'src/app/core/services/alerts.service';

@Component({
  selector: 'app-registro-password',
  templateUrl: './registro-password.page.html',
  styleUrls: ['./registro-password.page.scss'],
})
export class RegistroPasswordPage implements OnInit {
  //Variable para el nuevo usuario
  nuevoUsuario!: Usuario;

  //Variables del formulario
  password!: string;
  confirmPassword!: string;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private alert:AlertsService, private menucontroller:MenuController) {
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
    this.menucontroller.enable(false, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
  }

  //Función que se ejecuta al presionar el botón de continuar
  siguienteFormulario() {
    //Si el usuario no ingreso valores en los inputs o los dejo vacios
    if (this.password == undefined || this.confirmPassword == undefined||
        this.password == "" || this.confirmPassword == "")
    {
      const titulo = "Campos vacios";
      const mensaje = "Por favor, valide que los campos contengan su información";
      this.alert.mostrar(titulo, mensaje)
      return;
    }

    //Validación de formatos
    //8 caracteres minimo
    const longitudClave = /^.{8,}$/;
    if(!longitudClave.test(this.password)){
      const titulo = "Contraseña invalida";
      const mensaje = "La contraseña debe contener 8 caracteres como minimo";
      this.alert.mostrar(titulo, mensaje)
      return;
    }

    //Una mayuscula
    const tieneMayuscula = /[A-Z]/;
    if(!tieneMayuscula.test(this.password)){
      const titulo = "Contraseña invalida";
      const mensaje = "Su contraseña debe contener al menos una letra mayuscula";
      this.alert.mostrar(titulo, mensaje)
      return;
    }

    //Un numero
    const tieneNumero = /[0-9]/;
    if(!tieneNumero.test(this.password)){
      const titulo = "Contraseña invalida";
      const mensaje = "Su contraseña debe contener al menos un numero";
      this.alert.mostrar(titulo, mensaje)
      return;
    }
    
    //Caracteres especiales
    const caracteresEspeciales = /[!@#$%^&*(),.?":{}|<>]/;
    if(!caracteresEspeciales.test(this.password)){
      const titulo = "Contraseña invalida";
      const mensaje = "Su contraseña debe contener al menos un caracter especial";
      this.alert.mostrar(titulo, mensaje)
      return;
    }

    //Validar que coincidan
    if(this.password != this.confirmPassword){
      const titulo = "Contraseñas no coinciden";
      const mensaje = "Por favor, valide que las contraseñas coincidan";
      this.alert.mostrar(titulo, mensaje)
      return;
    }

    //Si pasa las validaciones, entonces guarda los datos
    this.nuevoUsuario.password = this.password;

    //Preparamos la data para enviarla a la siguiente pagina
    let navigationextras: NavigationExtras = {
      state: {
        nuevoUsuario: this.nuevoUsuario
      }
    }

    //Redirecciona al siguiente formulario
    this.router.navigate(['/registro-seguridad'], navigationextras);
  }

}
