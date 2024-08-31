import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlarmaRecipeContactoPageRoutingModule } from './alarma-recipe-contacto-routing.module';

import { AlarmaRecipeContactoPage } from './alarma-recipe-contacto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlarmaRecipeContactoPageRoutingModule
  ],
  declarations: [AlarmaRecipeContactoPage]
})
export class AlarmaRecipeContactoPageModule {}
