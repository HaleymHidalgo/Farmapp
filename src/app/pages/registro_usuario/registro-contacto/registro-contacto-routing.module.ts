import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroContactoPage } from './registro-contacto.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroContactoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroContactoPageRoutingModule {}
