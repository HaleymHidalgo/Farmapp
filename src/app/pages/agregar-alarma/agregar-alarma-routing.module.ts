import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarAlarmaPage } from './agregar-alarma.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarAlarmaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarAlarmaPageRoutingModule {}
