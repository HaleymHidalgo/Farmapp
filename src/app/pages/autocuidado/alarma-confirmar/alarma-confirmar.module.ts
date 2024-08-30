import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlarmaConfirmarPageRoutingModule } from './alarma-confirmar-routing.module';

import { AlarmaConfirmarPage } from './alarma-confirmar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlarmaConfirmarPageRoutingModule
  ],
  declarations: [AlarmaConfirmarPage]
})
export class AlarmaConfirmarPageModule {}
