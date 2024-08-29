import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  alarmas: any = [
    {
      medicamento: "Apralozam",
      dosis: "200 mg",
      hora: "14:30"
    },

    {
      medicamento: "Cardevilol",
      dosis: "12.5 mg",
      hora: "22:00"
    },

    {
      medicamento: "Losartan",
      dosis: "50 mg",
      hora: "18:45"
    },

  ];

  constructor() { }

  ngOnInit() {
  }

}