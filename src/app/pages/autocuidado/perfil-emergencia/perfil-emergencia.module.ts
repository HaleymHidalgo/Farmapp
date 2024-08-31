import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilEmergenciaPageRoutingModule } from './perfil-emergencia-routing.module';

import { PerfilEmergenciaPage } from './perfil-emergencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilEmergenciaPageRoutingModule
  ],
  declarations: [PerfilEmergenciaPage]
})
export class PerfilEmergenciaPageModule {}
