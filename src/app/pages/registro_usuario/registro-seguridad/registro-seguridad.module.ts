import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroSeguridadPageRoutingModule } from './registro-seguridad-routing.module';

import { RegistroSeguridadPage } from './registro-seguridad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroSeguridadPageRoutingModule
  ],
  declarations: [RegistroSeguridadPage]
})
export class RegistroSeguridadPageModule {}
