import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alarma-confirmar',
  templateUrl: './alarma-confirmar.page.html',
  styleUrls: ['./alarma-confirmar.page.scss'],
})
export class AlarmaConfirmarPage implements OnInit {
  //Variable para almacenar la información del recipe
  recipe!: any;

  verAlarma:boolean = false;

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

  verDetalles(){
    this.verAlarma=!this.verAlarma;
  }
}
