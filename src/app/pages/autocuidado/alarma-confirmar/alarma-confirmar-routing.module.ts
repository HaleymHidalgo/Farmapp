import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmaConfirmarPage } from './alarma-confirmar.page';

const routes: Routes = [
  {
    path: '',
    component: AlarmaConfirmarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmaConfirmarPageRoutingModule {}
