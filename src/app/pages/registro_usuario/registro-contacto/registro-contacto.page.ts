import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/core/models/usuario';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-registro-contacto',
  templateUrl: './registro-contacto.page.html',
  styleUrls: ['./registro-contacto.page.scss'],
})
export class RegistroContactoPage implements OnInit {
  //Variable de nuevo usuario
  nuevoUsuario!: Usuario;

  //Variables del formulario
  nrTelefono: string = "+569";
  email!:string;
  direccion!:string;

  //Obtener Rol actual
  rolActual!: number;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private alert:AlertsService, private db:DatabaseService, private menucontroller: MenuController) {
    //Capturamos la información de NavigationExtras
    this.activatedroute.queryParams.subscribe(params => {
      //Validamos si viene o no información desde la pagina
      if(this.router.getCurrentNavigation()?.extras.state){
        //Capturamos la información
        this.nuevoUsuario = this.router.getCurrentNavigation()?.extras?.state?.['nuevoUsuario']
      }
    });
  }

  ngOnInit() {
    //Obtenemos el rol actual
    this.db.fetchUsuarioActual().subscribe(data => this.rolActual = data.id_tipo_usuario);
    this.menucontroller.enable(false, 'soporte');
    this.menucontroller.enable(false, 'autocuidado');
  }

  //Función que se ejecuta al presionar el botón de continuar
  async siguienteFormulario() {
    //Si el usuario no ingreso valores en los inputs o los dejo vacios
    if (this.nrTelefono == undefined || this.email == undefined || this.direccion == undefined ||
        this.nrTelefono == "" || this.email == "" || this.direccion == "")
    {
      const titulo = "Campos vacios";
      const mensaje = "Por favor, valide que los campos contengan su información";
      this.alert.mostrar(titulo, mensaje)
      return;
    }

    //Validación de formatos

    //Numero de Telefono
    const chilePhoneRegex = /^\+569\d{8}$/;
    if(!chilePhoneRegex.test(this.nrTelefono)){
      const titulo = "Telefono Invalido";
      const mensaje = "Por favor, valide que el numero de telefono este escrito correctamente";
      this.alert.mostrar(titulo, mensaje)
      return;
    }

    //Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(this.email)){
      const titulo = "Correo electronico Invalido";
      const mensaje = "Por favor, valide que el correo electronico este escrito correctamente";
      this.alert.mostrar(titulo, mensaje)
      return;
    }

    this.email = this.email.toLowerCase();

    //Validación de existencia de correo electronico
    const emailExiste = await this.db.emailExiste(this.email);
    if (emailExiste){
      const titulo = "Correo electronico registrado";
      const mensaje = "El correo electronico ingresado ya se encuentra registrado, por favor, ingrese otro correo electronico para su cuenta";
      this.alert.mostrar(titulo, mensaje)
      return;
    }

    //Si pasa las validaciones, entonces guarda los datos
    this.nuevoUsuario.telefono = this.nrTelefono;
    this.nuevoUsuario.email = this.email;
    this.nuevoUsuario.direccion = this.direccion;

    //Preparamos la data para enviarla a la siguiente pagina
    let navigationextras: NavigationExtras = {
      state: {
        nuevoUsuario: this.nuevoUsuario
      }
    }

    if(this.rolActual == 0){
      //Redirecciona al siguiente formulario
      this.router.navigate(['/registro-password'], navigationextras);
    }
    else if(this.rolActual == 1){
      //Redirecciona al siguiente formulario
      this.router.navigate(['/registro-foto-perfil'], navigationextras);
    }
  }
}
