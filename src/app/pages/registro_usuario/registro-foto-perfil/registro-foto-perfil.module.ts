import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroFotoPerfilPageRoutingModule } from './registro-foto-perfil-routing.module';

import { RegistroFotoPerfilPage } from './registro-foto-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroFotoPerfilPageRoutingModule
  ],
  declarations: [RegistroFotoPerfilPage]
})
export class RegistroFotoPerfilPageModule {}
