import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {
  //arreglo donde se guarda la data del usuario
  usuario!: any;

  verAlarma:boolean = true;

  alarmas:any = [
    {
      nombre: "Losartan",
      dosis: "12,5 mg",
      hora: "11:00"
    },

    {
      nombre: "Paracetamol",
      dosis: "500 mg",
      hora: "21:00"
    }
  ];

  constructor(private router: Router, private activatedroute: ActivatedRoute, private menucontroller: MenuController) {
    //Capturamos la información de NavigationExtras
    this.activatedroute.queryParams.subscribe(params => {
      //Validamos si viene o no información desde la pagina
      if(this.router.getCurrentNavigation()?.extras.state){
        //Capturamos la información
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['nuevoUsuario']
      }
    });
  }

  ngOnInit() {
    this.menucontroller.enable(false, 'soporte');
    this.menucontroller.enable(true, 'autocuidado');
  }

  nuevaAlarma(){
    //Redireccionamos a la pagina agregar-alarma
    this.router.navigate(['/autocuidado/agregar-alarma']);
  }

  verDetalles(){
    this.verAlarma=!this.verAlarma;
  }

}
