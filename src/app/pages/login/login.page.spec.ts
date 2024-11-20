import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { DatabaseService } from 'src/app/core/services/database.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { IonicModule, MenuController } from '@ionic/angular';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  // Spies & Mocks
  const AlertsServiceMock = {
    mostrar: jasmine.createSpy('mostrar')
  };

  const AutenticacionServiceMock = {
    obtenerSesion: jasmine.createSpy('obtenerSesion').and.returnValue(Promise.resolve()),
    iniciarSesion: jasmine.createSpy('iniciarSesion')
  };

  const DatabaseServiceMock = {
    isDBReady: of(true)
  };

  const MenuControllerMock = {
    enable: jasmine.createSpy('enable')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AlertsService, useValue: AlertsServiceMock },
        { provide: AutenticacionService, useValue: AutenticacionServiceMock },
        { provide: DatabaseService, useValue: DatabaseServiceMock },
        { provide: MenuController, useValue: MenuControllerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia deshabilitar los menús en al entar en la pagina, ngOnInit()', () => {
    component.ngOnInit();
    expect(MenuControllerMock.enable).toHaveBeenCalledWith(false, 'soporte');
    expect(MenuControllerMock.enable).toHaveBeenCalledWith(false, 'autocuidado');
  });

  it('Deberia llamar a "obtenerSesion()" al ingresar a la vista', async () => {
    await component.ionViewWillEnter();
    expect(AutenticacionServiceMock.obtenerSesion).toHaveBeenCalled();
  });

  it('Deberia mostrar un mensaje de error si los campos están vacíos', () => {
    component.email = '';
    component.password = '';
    component.validarLogin();

    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith('Campos vacíos', 'Por favor, ingrese sus datos');
  });

  it('Deberia mostrar un mensaje de error si el correo no contiene "@"', () => {
    component.email = 'emailmail.com';
    component.password = 'password123';
    component.validarLogin();

    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith('Correo Electronico invalido', 'Por favor, ingrese sus datos nuevamente');
  });

  it('Deberia llamar a iniciarSesion() si los datos son válidos', () => {
    component.email = 'email@mail.com';
    component.password = 'password123';

    component.validarLogin();

    expect(AutenticacionServiceMock.iniciarSesion).toHaveBeenCalledWith('email@mail.com', 'password123');
  });
  
});