import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroNombrePage } from './registro-nombre.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroNombrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroNombrePageRoutingModule {}
