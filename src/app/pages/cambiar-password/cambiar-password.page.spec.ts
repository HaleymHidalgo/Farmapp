import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarPasswordPage } from './cambiar-password.page';
import { DatabaseService } from 'src/app/core/services/database.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

describe('CambiarPasswordPage', () => {
  let component: CambiarPasswordPage;
  let fixture: ComponentFixture<CambiarPasswordPage>;

  // Mocks y Spies
  const AlertsServiceMock = {
    mostrar: jasmine.createSpy('mostrar'),
  };

  const DatabaseServiceMock = {
    fetchUsuarioActual: jasmine.createSpy('fetchUsuarioActual').and.returnValue(
      of({ id_usuario: 1, id_tipo_usuario: 1 })
    ),
    obtenerUsuarioPorEmail: jasmine.createSpy('obtenerUsuarioPorEmail').and.returnValue(
      Promise.resolve(1)
    ),
    actualizarPassword: jasmine.createSpy('actualizarPassword').and.returnValue(Promise.resolve(true)),
  };

  const RouterMock = {
    navigate: jasmine.createSpy('navigate'),
    getCurrentNavigation: jasmine.createSpy('getCurrentNavigation').and.returnValue({
      extras: {
        state: { email: 'usuario@ejemplo.com' },
      },
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambiarPasswordPage],
      providers: [
        { provide: AlertsService, useValue: AlertsServiceMock },
        { provide: DatabaseService, useValue: DatabaseServiceMock },
        { provide: Router, useValue: RouterMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia recibir el email desde la pagina de "codigo-password"', () => {
    expect(component.emailBuscar).toBe('usuario@ejemplo.com');
  });

  it('Deberia mostrar un error si los campos de contraseña están vacíos', async () => {
    component.password = '';
    component.confirmPassword = '';
    await component.confirmarCambioPassword();
    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith('Error: ', 'Los campos están vacíos');
  });

  it('Deberia mostrar error si las contraseñas no coinciden', async () => {
    component.password = 'Password123!';
    component.confirmPassword = 'Password456!';
    await component.confirmarCambioPassword();
    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith('Error: ', 'Las contraseñas no coinciden');
  });

  it('Deberia mostrar error si la contraseña no cumple con los requisitos de seguridad', async () => {
    component.password = 'short';
    component.confirmPassword = 'short';
    await component.confirmarCambioPassword();
    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith('Error: ', 'La contraseña no cumple con los requisitos');
  });

  it('Deberia actualizar la contraseña y redirigir al menú principal de Autocuidado si las validaciones pasan', async () => {
    component.password = 'Password123!';
    component.confirmPassword = 'Password123!';
    component.id_rolUsuario = 1;

    await component.confirmarCambioPassword();
    expect(DatabaseServiceMock.actualizarPassword).toHaveBeenCalledWith(1, 'Password123!');
    expect(RouterMock.navigate).toHaveBeenCalledWith(['autocuidado/menu-principal']);
  });

  it('Debe redirigir al login si el usuario es no logueado y la contraseña se actualiza correctamente', async () => {
    component.password = 'Password123!';
    component.confirmPassword = 'Password123!';
    component.id_rolUsuario = 0;

    await component.confirmarCambioPassword();
    expect(RouterMock.navigate).toHaveBeenCalledWith(['login']);
  });

  it('Debe redirigir al menú de soporte si el usuario tiene el rol de soporte y la contraseña se actualiza correctamente', async () => {
    component.password = 'Password123!';
    component.confirmPassword = 'Password123!';
    component.id_rolUsuario = 2;

    await component.confirmarCambioPassword();
    expect(RouterMock.navigate).toHaveBeenCalledWith(['soporte/menu-principal']);
  });

  it('Debe manejar errores durante la actualización de contraseña', async () => {
    DatabaseServiceMock.actualizarPassword.and.returnValue(Promise.reject('Error de base de datos'));

    component.password = 'Password123!';
    component.confirmPassword = 'Password123!';
    component.id_rolUsuario = 1;

    await component.confirmarCambioPassword();
    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith('Error: ', 'No se pudo actualizar la contraseña');
  });

  it('Debe redirigir al login al cancelar si el usuario es no logueado', async () => {
    component.id_rolUsuario = 0;
    await component.cancelarCambioPassword();
    expect(RouterMock.navigate).toHaveBeenCalledWith(['login']);
  });

  it('Debe redirigir al menú principal de Autocuidado al cancelar si el usuario tiene el rol Autocuidado', () => {
    component.id_rolUsuario = 1;
    component.cancelarCambioPassword();
    expect(RouterMock.navigate).toHaveBeenCalledWith(['autocuidado/menu-principal']);
  });

  it('Deberia redirigir al menu principal de soporte si el usuario cancela el cambio de contraseña y tiene el rol de soporte', async () => {
    component.id_rolUsuario = 2;
    await component.cancelarCambioPassword();
    expect(RouterMock.navigate).toHaveBeenCalledWith(['soporte/menu-principal']);
  });

  it('Deberia redirigir al menu principal de autocuidado si el usuario cancela el cambio de contraseña', async () => {
    component.id_rolUsuario = 1;
    await component.cancelarCambioPassword();
    expect(RouterMock.navigate).toHaveBeenCalledWith(['autocuidado/menu-principal']);
  });

  it('Deberia redirigir al login si el usuario cancela el cambio de contraseña y no tiene esta logeado', async () => {
    component.id_rolUsuario = 0;
    await component.cancelarCambioPassword();
    expect(RouterMock.navigate).toHaveBeenCalledWith(['login']);
  });

});