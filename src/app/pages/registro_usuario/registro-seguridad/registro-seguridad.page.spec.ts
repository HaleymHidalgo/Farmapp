import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroSeguridadPage } from './registro-seguridad.page';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/core/services/database.service';

describe('RegistroSeguridadPage', () => {
  let component: RegistroSeguridadPage;
  let fixture: ComponentFixture<RegistroSeguridadPage>;

  const RouterMock = {
    getCurrentNavigation: () => ({extras: {state: {nuevoUsuario: {}}}})
  };

  const DatabaseServiceMock = {
    obtenerPreguntasSeguridad: () => {},
    fetchPreguntasSeguridad: () => ({subscribe: () => {}})
  };

  const ActivatedRouteMock = {
    queryParams: {
      subscribe: () => {}
    }
  };

  //constructor(private router: Router, private activatedroute: ActivatedRoute, private alert:AlertsService, private db: DatabaseService, private menucontroller: MenuController)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroSeguridadPage ],
      providers: [
        AlertsService,
        MenuController,
        {provide: Router, useValue: RouterMock},
        {provide: DatabaseService, useValue: DatabaseServiceMock},
        {provide: ActivatedRoute, useValue: ActivatedRouteMock}
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
