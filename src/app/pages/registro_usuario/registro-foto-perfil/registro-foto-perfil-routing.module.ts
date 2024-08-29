import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroFotoPerfilPage } from './registro-foto-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroFotoPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroFotoPerfilPageRoutingModule {}
