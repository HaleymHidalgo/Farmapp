import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroContactoPageRoutingModule } from './registro-contacto-routing.module';

import { RegistroContactoPage } from './registro-contacto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroContactoPageRoutingModule
  ],
  declarations: [RegistroContactoPage]
})
export class RegistroContactoPageModule {}
