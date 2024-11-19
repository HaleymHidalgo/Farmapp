import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroNombrePage } from './registro-nombre.page';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, MenuController, NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/core/services/database.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuario';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegistroNombrePage', () => {
  let component: RegistroNombrePage;
  let fixture: ComponentFixture<RegistroNombrePage>; 
  
  const databaseServiceMock = {
    fetchUsuarioActual: () => of(new Usuario()),
  };
  
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);

  const NavControllerMock = {
    navigateForward: jasmine.createSpy('navigateForward'),
    navigateBack: jasmine.createSpy('navigateBack'),
  };

  //constructor(private router: Router, private alertcontroller: AlertController, private db: DatabaseService, private alerts:AlertsService, private menucontroller: MenuController) { }
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroNombrePage ],
      imports: [IonicModule.forRoot()],
      providers: [
        AlertController,
        AlertsService,
        MenuController,
        { provide: DatabaseService, useValue: databaseServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: NavController, useValue: NavControllerMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroNombrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
