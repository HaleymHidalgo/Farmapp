import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoPasswordPage } from './codigo-password.page';
import { EmailService } from 'src/app/core/services/email.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/core/services/database.service';

describe('CodigoPasswordPage', () => {
  let component: CodigoPasswordPage;
  let fixture: ComponentFixture<CodigoPasswordPage>;

  //Spyes & Mocks
  const EmailServiceMock = {
    enviarCorreo: jasmine.createSpy('enviarCorreo').and.returnValue({}),
  };

  const DatabaseServiceMock = {
    emailExiste: jasmine.createSpy('emailExiste').and.returnValue(true)
  };

  //constructor(private emailServ:EmailService, private alert:AlertsService, private router:Router, private db:DatabaseService) { }
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ CodigoPasswordPage ],
      providers: [
        AlertsService,
        Router,
        { provide: EmailService, useValue: EmailServiceMock },
        { provide: DatabaseService, useValue: DatabaseServiceMock }
      ]
    })
    fixture = TestBed.createComponent(CodigoPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
