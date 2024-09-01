import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionesClientePageRoutingModule } from './opciones-cliente-routing.module';

import { OpcionesClientePage } from './opciones-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionesClientePageRoutingModule
  ],
  declarations: [OpcionesClientePage]
})
export class OpcionesClientePageModule {}
