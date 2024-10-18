import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarMedicamentoPage } from './agregar-medicamento.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarMedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarMedicamentoPageRoutingModule {}
