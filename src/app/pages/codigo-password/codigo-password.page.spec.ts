import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoPasswordPage } from './codigo-password.page';
import { EmailService } from 'src/app/core/services/email.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/core/services/database.service';
import { IonicModule, NavController } from '@ionic/angular';
import { of } from 'rxjs';

describe('CodigoPasswordPage', () => {
  let component: CodigoPasswordPage;
  let fixture: ComponentFixture<CodigoPasswordPage>;

  // Spies & Mocks
  const DatabaseServiceMock = {
    emailExiste: jasmine.createSpy('emailExiste').and.returnValue(Promise.resolve(true))
  };

  const EmailServiceMock = {
    enviarCorreo: jasmine.createSpy('enviarCorreo').and.returnValue(of({ success: true }))
  }

  const RouterMock = {
    navigate: jasmine.createSpy('navigate')
  };

  const AlertsServiceMock = {
    mostrar: jasmine.createSpy('mostrar')
  };

  const NavControllerMock = {
    navigateForward: jasmine.createSpy('navigateForward'),
    navigateBack: jasmine.createSpy('navigateBack'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodigoPasswordPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: DatabaseService, useValue: DatabaseServiceMock },
        { provide: EmailService, useValue: EmailServiceMock },
        { provide: Router, useValue: RouterMock },
        { provide: AlertsService, useValue: AlertsServiceMock },
        { provide: NavController, useValue: NavControllerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CodigoPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia validar un formato de un correo valido', () => {
    const testEmail = 'email@mail.com';
    expect(component.verificarEmail(testEmail)).toBeTrue();
  });

  it('Deberia validar un formato de un correo invalido', () => {
    const testEmail = 'emailmail.com';
    expect(component.verificarEmail(testEmail)).toBeFalse();
  });

  it('Deberia mostrar un error si el campo de correo esta vacio', () => {
    component.emailRecuperacion = '';
    component.recuperarPassword();
    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith('Error', 'Por favor, ingrese su correo electrónico');
  });

  it('Deberia mostrar un error si el formato del email es invalido', async () => {
    component.emailRecuperacion = 'invalidemail';
    await component.recuperarPassword();
    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith('Error', 'Por favor, ingrese un correo electrónico válido');
  });

  it('Deberia enviar un email de recuperación al oprimir el boton "enivar correo"', () => {
    component.emailRecuperacion = 'email@mail.com';
    component.recuperarPassword();
    expect(component.enviado).toBeTrue();
    expect(EmailServiceMock.enviarCorreo).toHaveBeenCalledWith('email@mail.com', jasmine.any(Number));
    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith('Correo enviado', jasmine.any(String));
  });

  it('Deberia redidigir a "cambiar-password" si los tokens coinciden', () => {
    component.token = 123456;
    component.codigoRecuperacion = 123456;

    component.validarCodigo();

    expect(RouterMock.navigate).toHaveBeenCalledWith(['/cambiar-password'], { state: { email: component.emailRecuperacion } });
  });

  it('Deberia mostrar un error si los tokens no coinciden', () => {
    component.token = 123456;
    component.codigoRecuperacion = 654321;

    component.validarCodigo();

    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith('Código incorrecto', 'Por favor, ingrese el código correcto');
  });
});
