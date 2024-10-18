import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionesMedicamentoPageRoutingModule } from './opciones-medicamento-routing.module';

import { OpcionesMedicamentoPage } from './opciones-medicamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionesMedicamentoPageRoutingModule
  ],
  declarations: [OpcionesMedicamentoPage]
})
export class OpcionesMedicamentoPageModule {}
