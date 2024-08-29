import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroNombrePageRoutingModule } from './registro-nombre-routing.module';

import { RegistroNombrePage } from './registro-nombre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroNombrePageRoutingModule
  ],
  declarations: [RegistroNombrePage]
})
export class RegistroNombrePageModule {}
