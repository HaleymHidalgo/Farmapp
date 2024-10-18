import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarMedicamentoPageRoutingModule } from './agregar-medicamento-routing.module';

import { AgregarMedicamentoPage } from './agregar-medicamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarMedicamentoPageRoutingModule
  ],
  declarations: [AgregarMedicamentoPage]
})
export class AgregarMedicamentoPageModule {}
