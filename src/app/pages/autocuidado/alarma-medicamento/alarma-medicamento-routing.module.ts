import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmaMedicamentoPage } from './alarma-medicamento.page';

const routes: Routes = [
  {
    path: '',
    component: AlarmaMedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmaMedicamentoPageRoutingModule {}
