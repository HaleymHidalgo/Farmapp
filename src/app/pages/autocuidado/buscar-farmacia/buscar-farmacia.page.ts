import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-buscar-farmacia',
  templateUrl: './buscar-farmacia.page.html',
  styleUrls: ['./buscar-farmacia.page.scss'],
})
export class BuscarFarmaciaPage implements OnInit {

  constructor(private menucontroller:MenuController) { }

  ngOnInit() {
    this.menucontroller.enable(false, 'soporte');
    this.menucontroller.enable(true, 'autocuidado');
  }

}
