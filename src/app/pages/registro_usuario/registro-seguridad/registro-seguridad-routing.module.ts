import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroSeguridadPage } from './registro-seguridad.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroSeguridadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroSeguridadPageRoutingModule {}
