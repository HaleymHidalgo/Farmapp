import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alarma-recipe',
  templateUrl: './alarma-recipe.page.html',
  styleUrls: ['./alarma-recipe.page.scss'],
})
export class AlarmaRecipePage implements OnInit {
  //Arreglo que guadara los datos del recipe
  recipe: any = {
    direccion: "",
    nombreDoctor: "",
    fechaAtencion: "",
    numTelefono: "",
    email: "",
    tratamiento: []
  };

  //variables para guardar los datos ingresados por el usuario
  direccion!: string;
  nombreDoctor: string = "Dr/a. ";
  fechaAtencion!: string;


  constructor(private router: Router, private alertcontroller: AlertController) { }

  ngOnInit() {
  }

  //Función que se ejecuta al presionar el botón de continuar
  siguienteFormulario() {
    //Si el usuario no ingreso valores en los inputs o los dejo vacios
    if (this.direccion == undefined || this.nombreDoctor == undefined || this.fechaAtencion == undefined ||
      this.direccion == "" || this.nombreDoctor == "" || this.fechaAtencion == "")
      {
        const titulo = "Campos vacios";
        const mensaje = "Por favor, valide que los campos contengan su información";
        this.alerta(titulo, mensaje)
        return;
      }

      //Validación de formatos

      //Valida que el nombre y apellidos no contengan números
      const noNumbersRegex = /^[^\d]+$/;
      if(
        !noNumbersRegex.test(this.nombreDoctor))
      {
        const titulo = "Nombre de meciamento invalidos";
        const mensaje = "Por favor, valide que el campo de nombre contenga números";
        this.alerta(titulo, mensaje)
        return
      }

      //validacion de fecha (si es posterior al momento actual)
      const actual = new Date();
      const fecha = new Date(this.fechaAtencion);
      if (fecha.getTime() > actual.getTime()) {
        const titulo = "Fecha incorrecta";
        const mensaje = "La fecha de atención no puede ser posterior a la fecha actual";
        this.alerta(titulo, mensaje)
        return;
      }

      //Si pasa las validaciones, entonces guarda los datos
      this.recipe.direccion = this.direccion;
      this.recipe.nombreDoctor = this.nombreDoctor;
      this.recipe.fechaAtencion = this.fechaAtencion;

      //Preparamos la data para enviarla a la siguiente pagina
      let navigationextras: NavigationExtras = {
        state: {
          nuevoRecipe: this.recipe
        }
      }

      //Redirecciona al siguiente formulario
      this.router.navigate(['/autocuidado/alarma-recipe-contacto'], navigationextras);
    }

  async alerta(titulo: string, mensaje: string){
      const alert = await this.alertcontroller.create({
        header: titulo,
        message: mensaje,
        buttons: ['OK']
      });
      await alert.present();
  }
}