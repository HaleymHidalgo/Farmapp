import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.page.html',
  styleUrls: ['./cambiar-password.page.scss'],
})
export class CambiarPasswordPage implements OnInit {

  //Variable para almacenar datos de identificación
  id_usuario!: number;
  id_rolUsuario!: number;
  emailBuscar!: string;

  password!: string;
  confirmPassword!: string;

  constructor(private router: Router, private alerts:AlertsService, private db:DatabaseService, private activatedroute: ActivatedRoute) {}

  ngOnInit() {
    // Capturar email desde el estado de navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['email']) {
      this.emailBuscar = navigation.extras.state?.['email'];
    }
  
    // Obtener el usuario actual
    this.db.fetchUsuarioActual().subscribe(data => {
      if (data.id_tipo_usuario == 0 && this.emailBuscar) {
        // Usuario no logueado (recuperación de contraseña)
        this.db.obtenerUsuarioPorEmail(this.emailBuscar)
          .then(res => {
            this.id_usuario = res;
            this.id_rolUsuario = data.id_tipo_usuario;
          })
          .catch(error => this.alerts.mostrar('Error: ', 'No se pudo obtener el usuario'));
      } else if (data.id_tipo_usuario == 1) {
        // Usuario normal (Autocuidado)
        this.id_usuario = data.id_usuario;
        this.id_rolUsuario = data.id_tipo_usuario;
      } else if (data.id_tipo_usuario == 2) {
        // Usuario de soporte
        this.db.fetchCredencialesUsuario().subscribe(credenciales => {
          this.id_usuario = credenciales.id_usuario;
          this.id_rolUsuario = data.id_tipo_usuario;
        });
      }
    });
  }
  

  async confirmarCambioPassword() {
    // Validar que los campos de contraseña no estén vacíos
    if (!this.password || !this.confirmPassword) {
      this.alerts.mostrar('Error: ', 'Los campos están vacíos');
      return;
    }
  
    // Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      this.alerts.mostrar('Error: ', 'Las contraseñas no coinciden');
      return;
    }
  
    // Validación de formatos de contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.password)) {
      this.alerts.mostrar('Error: ', 'La contraseña no cumple con los requisitos');
      return;
    }
  
    // Si todas las validaciones pasan, actualizar la contraseña
    try {
      await this.db.actualizarPassword(this.id_usuario, this.password);
      // Redirigir dependiendo del tipo de usuario
      switch (this.id_rolUsuario) {
        case 0:
          this.router.navigate(['login']);
          break;
        case 1:
          this.router.navigate(['autocuidado/menu-principal']);
          break;
        case 2:
          this.router.navigate(['soporte/menu-principal']);
          break;
        default:
          this.alerts.mostrar('Error: ', 'No se pudo redirigir. Tipo de usuario no reconocido.');
      }
    } catch (error) {
      this.alerts.mostrar('Error: ', 'No se pudo actualizar la contraseña');
    }
  }
  
  async cancelarCambioPassword() {
    // Redirigir dependiendo del tipo de usuario
    switch (this.id_rolUsuario) {
      case 0:
        this.router.navigate(['login']);
        break;
      case 1:
        this.router.navigate(['autocuidado/menu-principal']);
        break;
      case 2:
        this.router.navigate(['soporte/menu-principal']);
        break;
      default:
        this.alerts.mostrar('Error: ', 'No se pudo redirigir. Tipo de usuario no reconocido.');
    }
  }
}
