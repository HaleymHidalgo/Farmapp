import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alarma-medicamento',
  templateUrl: './alarma-medicamento.page.html',
  styleUrls: ['./alarma-medicamento.page.scss'],
})
export class AlarmaMedicamentoPage implements OnInit {
  //Arreglo que guadara los datos del recipe
  recipe: any = {
    tramiento: undefined
  };

  nombreMedicamento!: string;
  cantidadMedicamento!: number;
  horasMedicamento!: number;
  diasMedicamento!: number;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private alertcontroller: AlertController) {
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
    if (
      this.nombreMedicamento == undefined ||
      this.cantidadMedicamento == undefined || 
      this.horasMedicamento == undefined || 
      this.diasMedicamento == undefined ||
      this.nombreMedicamento == "")
      {
        const titulo = "Campos vacios";
        const mensaje = "Por favor, valide que los campos contengan su información";
        this.alerta(titulo, mensaje)
        return;
      }

      //Validación de formatos

      //validacion de cantidad
      if ( this.cantidadMedicamento <= 0||this.horasMedicamento <= 0 || this.diasMedicamento <= 0) {
        const titulo = "Cantidades invalidas";
        const mensaje = "Los campos no pueden tener numero negativos o 0. Ingrese un valor valido";
        this.alerta(titulo, mensaje)
        return;
      }

      //Si pasa las validaciones, entonces guarda los datos
      this.recipe.tratamiento = {
        nombreMedicamento: this.nombreMedicamento,
        cantidadMedicamento: this.cantidadMedicamento,
        horasMedicamento: this.horasMedicamento,
        diasMedicamento: this.diasMedicamento
      }

      //Preparamos la data para enviarla a la siguiente pagina
      let navigationextras: NavigationExtras = {
        state: {
          nuevoRecipe: this.recipe
        }
      }

      //Redirecciona al siguiente formulario
      this.router.navigate(['/autocuidado/alarma-confirmar'], navigationextras);
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