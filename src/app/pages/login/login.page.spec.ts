import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { DatabaseService } from 'src/app/core/services/database.service';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { EmailService } from 'src/app/core/services/email.service';
import { IonicModule, MenuController } from '@ionic/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  const DatabaseServiceMock = {
    isDatabaseReady: jasmine.createSpy('isDatabaseReady').and.returnValue(true)
  };

  const AutenticacionServiceMock = {
    obtenerSesion: jasmine.createSpy('obtenerSesion'),
    iniciarSesion: jasmine.createSpy('iniciarSesion')
  };

  //constructor(private router: Router, private alert:AlertsService, private db: DatabaseService, private auth:AutenticacionService, private emailServ:EmailService, private menucontroller: MenuController) { }
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        AlertsService,
        MenuController,
        Router,
        { provide: DatabaseService, useValue: DatabaseServiceMock },
        { provide: AutenticacionService, useValue: AutenticacionServiceMock } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
