import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmaRecipeContactoPage } from './alarma-recipe-contacto.page';

const routes: Routes = [
  {
    path: '',
    component: AlarmaRecipeContactoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmaRecipeContactoPageRoutingModule {}
