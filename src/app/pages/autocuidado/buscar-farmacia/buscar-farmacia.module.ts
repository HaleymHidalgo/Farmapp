import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarFarmaciaPageRoutingModule } from './buscar-farmacia-routing.module';

import { BuscarFarmaciaPage } from './buscar-farmacia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarFarmaciaPageRoutingModule
  ],
  declarations: [BuscarFarmaciaPage]
})
export class BuscarFarmaciaPageModule {}
