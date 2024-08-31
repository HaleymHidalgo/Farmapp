import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlarmaMedicamentoPageRoutingModule } from './alarma-medicamento-routing.module';

import { AlarmaMedicamentoPage } from './alarma-medicamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlarmaMedicamentoPageRoutingModule
  ],
  declarations: [AlarmaMedicamentoPage]
})
export class AlarmaMedicamentoPageModule {}
