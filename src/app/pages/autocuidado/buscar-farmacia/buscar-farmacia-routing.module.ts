import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarFarmaciaPage } from './buscar-farmacia.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarFarmaciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarFarmaciaPageRoutingModule {}
