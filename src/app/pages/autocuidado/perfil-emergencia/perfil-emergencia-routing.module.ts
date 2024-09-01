import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilEmergenciaPage } from './perfil-emergencia.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilEmergenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilEmergenciaPageRoutingModule {}
