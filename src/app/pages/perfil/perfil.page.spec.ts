import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { DatabaseService } from 'src/app/core/services/database.service';
import { AlertController, IonicModule, MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { CamaraService } from 'src/app/core/services/camara.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  // Spies y Mocks
  const AlertsServiceMock = {
    mostrar: jasmine.createSpy('mostrar'),
  };

  const CamaraServiceMock = {
    takePicture: jasmine.createSpy('takePicture').and.returnValue(Promise.resolve('base64Image')),
  };

  const DatabaseServiceMock = {
    fetchUsuarioActual: jasmine.createSpy('fetchUsuarioActual').and.returnValue(of({
      id_tipo_usuario: 1,
      id_usuario: 1,
      nombre: 'Juan',
      apellido_p: 'Pérez',
      apellido_m: 'López',
      email: 'juan@example.com',
      telefono: '+56912345678',
      direccion: 'Calle Falsa 123',
      img_url: 'path/to/image.jpg',
    })),
    actualizarUsuario: jasmine.createSpy('actualizarUsuario').and.returnValue(Promise.resolve()),
    buscarContactoEmergencia: jasmine.createSpy('buscarContactoEmergencia').and.returnValue(Promise.resolve(false)),
  };

  const RouterMock = {
    navigate: jasmine.createSpy('navigate'),
  };

  const MenuControllerMock = {
    enable: jasmine.createSpy('enable'),
  };

  const AlertControllerMock = {
    create: jasmine.createSpy('create').and.returnValue({
      present: jasmine.createSpy('present'),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AlertsService, useValue: AlertsServiceMock },
        { provide: CamaraService, useValue: CamaraServiceMock },
        { provide: DatabaseService, useValue: DatabaseServiceMock },
        { provide: Router, useValue: RouterMock },
        { provide: MenuController, useValue: MenuControllerMock },
        { provide: AlertController, useValue: AlertControllerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia habilitar el menú adecuado dependiendo del tipo de usuario', () => {
    component.obtenerDatosUser();
    expect(MenuControllerMock.enable).toHaveBeenCalledWith(true, 'autocuidado');
    expect(MenuControllerMock.enable).toHaveBeenCalledWith(false, 'soporte');
  });

  it('Deberia alternar la edición de los campos del perfil', () => {
    component.editarCampos();
    expect(component.esEditable).toBeTrue();
  });

  it('Deberia cargar los datos del usuario actual correctamente', () => {
    component.obtenerDatosUser();
    expect(component.nombre).toBe('Juan');
    expect(component.correo).toBe('juan@example.com');
  });

  it('Deberia cancelar los cambios y restaurar los datos originales', () => {
    component.nombre = 'Otro Nombre';
    component.cancelarCambios();
    expect(component.nombre).toBe('Juan');
    expect(component.esEditable).toBeFalse();
  });

  it('Debe mostrar un error si hay campos vacíos al guardar cambios', async () => {
    component.nombre = '';
    await component.guardarCambios();
    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith('Error', 'Los campos no pueden estar vacios');
  });

  it('Debe mostrar un error si el correo es inválido al guardar cambios', async () => {
    component.correo = 'correo-invalido';
    await component.guardarCambios();
    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith('Error', 'El correo no es valido');
  });

  it('Deberia mostrar una alerta para crear un contacto de emergencia si el usuario no pesee uno', async () => {
    component.datosUsuario.id_cont_emergencia = null;
    await component.verContactoEmergecia();
    expect(AlertControllerMock.create).toHaveBeenCalled();
  });

  it('Debe redirigir al formulario para cambiar contraseña', () => {
    component.cambiarPassword();
    expect(RouterMock.navigate).toHaveBeenCalledWith(['/cambiar-password']);
  });
});