import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarAlarmaPageRoutingModule } from './agregar-alarma-routing.module';

import { AgregarAlarmaPage } from './agregar-alarma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAlarmaPageRoutingModule
  ],
  declarations: [AgregarAlarmaPage]
})
export class AgregarAlarmaPageModule {}
