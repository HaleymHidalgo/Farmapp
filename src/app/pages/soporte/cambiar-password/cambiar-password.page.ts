import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.page.html',
  styleUrls: ['./cambiar-password.page.scss'],
})
export class CambiarPasswordPage implements OnInit {

  id_usuario!: number;
  password!: string;
  confirmPassword!: string;

  constructor(private alertcontroller: AlertController, private router: Router, private alerts:AlertsService, private db:DatabaseService) { }

  ngOnInit() {
    this.db.fetchCredencialesUsuario().subscribe(data => {
      this.id_usuario = data.id_usuario;
    });
  }

  confirmarCambioPassword() {
    //Si el usuario no ingreso valores en los inputs o los dejo vacios
    if (this.password == undefined || this.confirmPassword == undefined || this.password == "" || this.confirmPassword == ""){
      this.alerts.mostrar('Error: ', 'Los campos estan vacios');
      return;
    }

    //Validar que coincidan
    if(this.password != this.confirmPassword){
      this.alerts.mostrar('Error: ', 'Los campos no coinciden');
      return;
    }

    //Validación de formatos
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(this.password)){
      this.alerts.mostrar('Error: ', 'Los campos no cumplen las condiciones');
      return;
    }

    //Si pasa todas las validaciones
    this.db.actualizarPassword(this.id_usuario, this.password);
    this.router.navigate(['soporte/menu-principal']);

  }
}
