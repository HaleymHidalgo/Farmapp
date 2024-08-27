import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroPasswordPage } from './registro-password.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPasswordPageRoutingModule {}
