import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoPasswordPage } from './codigo-password.page';
import { EmailService } from 'src/app/core/services/email.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/core/services/database.service';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

describe('CodigoPasswordPage', () => {
  let component: CodigoPasswordPage;
  let fixture: ComponentFixture<CodigoPasswordPage>;

  //Spyes & Mocks
  const DatabaseServiceMock = {
    emailExiste: jasmine.createSpy('emailExiste').and.returnValue(true)
  };

  const EmailServiceMock = jasmine.createSpyObj('EmailService', ['enviarCorreo']);

  //constructor(private emailServ:EmailService, private alert:AlertsService, private router:Router, private db:DatabaseService) { }
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ CodigoPasswordPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        AlertsService,
        Router,
        DatabaseService,
        { provide: DatabaseService, useValue: DatabaseServiceMock },
        { provide: EmailService, useValue: EmailServiceMock },
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
