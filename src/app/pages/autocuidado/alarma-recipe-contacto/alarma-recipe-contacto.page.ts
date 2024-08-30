import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alarma-recipe-contacto',
  templateUrl: './alarma-recipe-contacto.page.html',
  styleUrls: ['./alarma-recipe-contacto.page.scss'],
})
export class AlarmaRecipeContactoPage implements OnInit {
  //Arreglo que guadara los datos del recipe
  recipe: any = {};
  //variables para guardar los datos ingresados por el usuario
  numTelefono!: string;
  email!: string;

  constructor(private router: Router, private alertcontroller: AlertController, private activatedroute: ActivatedRoute) {
    //Capturamos la información de NavigationExtras
    this.activatedroute.queryParams.subscribe(params => {
      //Validamos si viene o no información desde la pagina
      if(this.router.getCurrentNavigation()?.extras.state){
        //Capturamos la información
        this.recipe = this.router.getCurrentNavigation()?.extras?.state?.['nuevoRecipe']
      }
    });
  }

  ngOnInit() {
  }

  //Función que se ejecuta al presionar el botón de continuar
  siguienteFormulario() {
    //Si el usuario no ingreso valores en los inputs o los dejo vacios
    if (this.numTelefono == undefined || this.email == undefined ||
      this.numTelefono == "" || this.email == "")
      {
        const titulo = "Campos vacios";
        const mensaje = "Por favor, valide que los campos contengan su información";
        this.alerta(titulo, mensaje)
        return;
      }

      //Validación de formatos
      //Numero de Telefono
      const chilePhoneRegex = /^\+569\d{8}$/;
      if(!chilePhoneRegex.test(this.numTelefono)){
        const titulo = "Telefono Invalido";
        const mensaje = "Por favor, valide que el numero de telefono este escrito correctamente";
        this.alerta(titulo, mensaje)
        return;
      }

      //Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(this.email)){
        const titulo = "Correo electronico Invalido";
        const mensaje = "Por favor, valide que el correo electronico este escrito correctamente";
        this.alerta(titulo, mensaje)
        return;
      }


      //Si pasa las validaciones, entonces guarda los datos
      this.recipe.numTelefono = this.numTelefono;
      this.recipe.email = this.email;

      //Preparamos la data para enviarla a la siguiente pagina
      let navigationextras: NavigationExtras = {
        state: {
          nuevoRecipe: this.recipe
        }
      }

      //Redirecciona al siguiente formulario
      this.router.navigate(['/autocuidado/alarma-medicamento'], navigationextras);
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