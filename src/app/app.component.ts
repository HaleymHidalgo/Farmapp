import { Component } from '@angular/core';
import { AutenticacionService } from './core/services/autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth:AutenticacionService) {}

  cerrarSesion(){
    this.auth.cerrarSesion();
  }
}
