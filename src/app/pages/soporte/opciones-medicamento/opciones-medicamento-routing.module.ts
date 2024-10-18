import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionesMedicamentoPage } from './opciones-medicamento.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionesMedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionesMedicamentoPageRoutingModule {}
