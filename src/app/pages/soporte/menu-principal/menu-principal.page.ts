import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  constructor(private menucontroller: MenuController) { }

  ngOnInit() {
    this.menucontroller.enable(true, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
  }

  openMenu() {
    this.menucontroller.open('menu');
  }
}