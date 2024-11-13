import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { DatabaseService } from 'src/app/core/services/database.service';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { AutenticacionService } from 'src/app/core/services/autenticacion.service';
import { EmailService } from 'src/app/core/services/email.service';
import { MenuController } from '@ionic/angular';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  const databaseServiceMock = {
    isDBReady: {
      subscribe: () => {}
    },
    iniciarSesion: () => {},
    obtenerSesion: () => {},
  };

  const AutenticacionServiceMock = {
    iniciarSesion: () => {},
    obtenerSesion: () => {},
  };

  const EmailServiceMock = {
    enviarCorreo: () => {},
  };

  //constructor(private router: Router, private alert:AlertsService, private db: DatabaseService, private auth:AutenticacionService, private emailServ:EmailService, private menucontroller: MenuController) { }
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      providers: [
        Router,
        AlertsService,
        MenuController,
        { provide: DatabaseService, useValue: databaseServiceMock },
        { provide: AutenticacionService, useValue: AutenticacionServiceMock },
        { provide: EmailService, useValue: EmailServiceMock }
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
