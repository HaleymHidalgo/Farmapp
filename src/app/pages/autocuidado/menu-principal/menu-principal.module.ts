import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPrincipalPageRoutingModule } from './menu-principal-routing.module';

import { MenuPrincipalPage } from './menu-principal.page';
import { TiempoAlarmaPipe } from 'src/app/core/pipes/tiempo-alarma.pipe';
import { StatusAlarmaPipe } from 'src/app/core/pipes/status-alarma.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPrincipalPageRoutingModule,
    TiempoAlarmaPipe,
    StatusAlarmaPipe
  ],
  declarations: [MenuPrincipalPage]
})
export class MenuPrincipalPageModule {}
