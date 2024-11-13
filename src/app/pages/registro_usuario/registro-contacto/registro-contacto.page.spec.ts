import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroContactoPage } from './registro-contacto.page';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/core/services/database.service';

describe('RegistroContactoPage', () => {
  let component: RegistroContactoPage;
  let fixture: ComponentFixture<RegistroContactoPage>;

  const RouterMock = {
    getCurrentNavigation: () => ({extras: {state: {nuevoUsuario: {}}}})
  };

  const DatabaseServiceMock = {
    fetchUsuarioActual: () => ({subscribe: () => {}})
  };

  const ActivatedRouteMock = {
    queryParams: {
      subscribe: () => {}
    }
  };

  //constructor(private router: Router, private activatedroute: ActivatedRoute, private alert:AlertsService, private db:DatabaseService, private menucontroller: MenuController)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [RegistroContactoPage],
      providers: [
        AlertsService,
        MenuController,
        {provide: Router, useValue: RouterMock},
        {provide: ActivatedRoute, useValue: ActivatedRouteMock},
        {provide: DatabaseService, useValue: DatabaseServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroContactoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
