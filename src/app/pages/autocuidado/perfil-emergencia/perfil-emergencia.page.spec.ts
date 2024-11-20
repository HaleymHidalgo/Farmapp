import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilEmergenciaPage } from './perfil-emergencia.page';
import { DatabaseService } from 'src/app/core/services/database.service';
import { IonicModule, MenuController } from '@ionic/angular';
import { CamaraService } from 'src/app/core/services/camara.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('PerfilEmergenciaPage', () => {
  let component: PerfilEmergenciaPage;
  let fixture: ComponentFixture<PerfilEmergenciaPage>;

  // Mocks y Spies
  const MenuControllerMock = {
    enable: jasmine.createSpy('enable'),
  };

  const AlertsServiceMock = {
    mostrar: jasmine.createSpy('mostrar'),
  };

  const CamaraServiceMock = {
    takePicture: jasmine.createSpy('takePicture').and.returnValue(Promise.resolve('mocked_image_url')),
  };

  const DatabaseServiceMock = {
    fetchContactoEmergencia: jasmine.createSpy('fetchContactoEmergencia').and.returnValue(
      of({
        nombres: 'Juan',
        apellido_p: 'Pérez',
        apellido_m: 'López',
        email: 'juan.perez@example.com',
        telefono: '+56912345678',
        direccion: 'Calle Falsa 123',
        img_url: 'mocked_image_url',
      })
    ),
    actualizarContactoEmergencia: jasmine.createSpy('actualizarContactoEmergencia').and.returnValue(Promise.resolve()),
    buscarContactoEmergencia: jasmine.createSpy('buscarContactoEmergencia').and.returnValue(Promise.resolve(true)),
    eliminarContactoEmergencia: jasmine.createSpy('eliminarContactoEmergencia').and.returnValue(Promise.resolve()),
  };

  const RouterMock = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilEmergenciaPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: MenuController, useValue: MenuControllerMock },
        { provide: AlertsService, useValue: AlertsServiceMock },
        { provide: CamaraService, useValue: CamaraServiceMock },
        { provide: DatabaseService, useValue: DatabaseServiceMock },
        { provide: Router, useValue: RouterMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilEmergenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('Debe habilitar el menú de autocuidado e inhabilitar el menú de soporte en ngOnInit', () => {
    component.ngOnInit();
    expect(MenuControllerMock.enable).toHaveBeenCalledWith(false, 'soporte');
    expect(MenuControllerMock.enable).toHaveBeenCalledWith(true, 'autocuidado');
  });

  it('Debe obtener los datos del contacto de emergencia y asignarlos correctamente', () => {
    component.obtenerDatosContacto();
    expect(component.nombre).toBe('Juan');
    expect(component.apellido_p).toBe('Pérez');
    expect(component.apellido_m).toBe('López');
    expect(component.correo).toBe('juan.perez@example.com');
    expect(component.telefono).toBe('+56912345678');
    expect(component.direccion).toBe('Calle Falsa 123');
    expect(component.imgPerfil).toBe('mocked_image_url');
  });

  it('Debe mostrar un error si algún campo está vacío al guardar cambios', async () => {
    component.nombre = '';
    await component.guardarCambios();
    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith('Error', 'Los campos no pueden estar vacios');
  });

  it('Debe mostrar un error si los nombres o apellidos contienen números', async () => {
    component.nombre = 'Juan1';
    component.apellido_p = 'Pérez';
    component.apellido_m = 'López';
    component.correo = 'juan.perez@example.com';
    component.telefono = '+56912345678';
    component.direccion = 'Calle Falsa 123';
    await component.guardarCambios();
    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith('Error', 'Los campos de nombre y/o apellidos no pueden contener números');
  });

  it('Debe actualizar los datos del contacto de emergencia si los datos son válidos', async () => {
    component.nombre = 'Juan';
    component.apellido_p = 'Pérez';
    component.apellido_m = 'López';
    component.correo = 'juan.perez@example.com';
    component.telefono = '+56912345678';
    component.direccion = 'Calle Falsa 123';
    await component.guardarCambios();
    expect(DatabaseServiceMock.actualizarContactoEmergencia).toHaveBeenCalledWith(
      'Juan',
      'Pérez',
      'López',
      'juan.perez@example.com',
      '+56912345678',
      'Calle Falsa 123',
      'mocked_image_url'
    );
  });

  it('Debe tomar una foto y actualizar la imagen de perfil', async () => {
    await component.tomarFoto();
    expect(component.imgPerfil).toBe('mocked_image_url');
  });

  it('Debe redirigir al contacto de emergencia si está configurado', async () => {
    await component.verContactoEmergecia();
    expect(RouterMock.navigate).toHaveBeenCalledWith(['/autocuidado/contacto-emergencia']);
  });

  it('Debe eliminar el contacto de emergencia y redirigir al perfil', async () => {
    await component.eliminarContacto();
    expect(DatabaseServiceMock.eliminarContactoEmergencia).toHaveBeenCalled();
    expect(RouterMock.navigate).toHaveBeenCalledWith(['/perfil']);
  });
});