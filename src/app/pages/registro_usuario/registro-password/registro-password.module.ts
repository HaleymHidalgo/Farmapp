import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPasswordPageRoutingModule } from './registro-password-routing.module';

import { RegistroPasswordPage } from './registro-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPasswordPageRoutingModule
  ],
  declarations: [RegistroPasswordPage]
})
export class RegistroPasswordPageModule {}
