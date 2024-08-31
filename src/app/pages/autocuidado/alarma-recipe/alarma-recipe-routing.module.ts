import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmaRecipePage } from './alarma-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: AlarmaRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmaRecipePageRoutingModule {}
