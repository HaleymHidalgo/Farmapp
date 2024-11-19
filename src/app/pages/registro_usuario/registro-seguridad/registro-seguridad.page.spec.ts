import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroSeguridadPage } from './registro-seguridad.page';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/core/services/database.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('RegistroSeguridadPage', () => {
  let component: RegistroSeguridadPage;
  let fixture: ComponentFixture<RegistroSeguridadPage>;

  const RouterMock = {
    getCurrentNavigation: () => ({extras: {state: {nuevoUsuario: {}}}}),
    navigate: jasmine.createSpyObj('Router', ['navigate'])
  };

  const DatabaseServiceMock = {
    obtenerPreguntasSeguridad: () => {},
    fetchPreguntasSeguridad: () => ({subscribe: () => {}})
  };

  const ActivatedRouteMock = {
    queryParams: of({})
  };

  const NavControllerMock = {
    navigateForward: jasmine.createSpy('navigateForward'),
    navigateBack: jasmine.createSpy('navigateBack'),
  };

  //constructor(private router: Router, private activatedroute: ActivatedRoute, private alert:AlertsService, private db: DatabaseService, private menucontroller: MenuController)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroSeguridadPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        AlertsService,
        MenuController,
        {provide: Router, useValue: RouterMock},
        {provide: DatabaseService, useValue: DatabaseServiceMock},
        {provide: ActivatedRoute, useValue: ActivatedRouteMock},
        {provide: NavController, useValue: NavControllerMock}
      ]
    })

    fixture = TestBed.createComponent(RegistroSeguridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
