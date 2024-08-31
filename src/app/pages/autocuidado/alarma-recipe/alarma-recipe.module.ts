import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlarmaRecipePageRoutingModule } from './alarma-recipe-routing.module';

import { AlarmaRecipePage } from './alarma-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlarmaRecipePageRoutingModule
  ],
  declarations: [AlarmaRecipePage]
})
export class AlarmaRecipePageModule {}
