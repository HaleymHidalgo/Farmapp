import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroFotoPerfilPage } from './registro-foto-perfil.page';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { MenuController } from '@ionic/angular';
import { CamaraService } from 'src/app/core/services/camara.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/core/services/database.service';

describe('RegistroFotoPerfilPage', () => {
  let component: RegistroFotoPerfilPage;
  let fixture: ComponentFixture<RegistroFotoPerfilPage>;

  const RouterMock = {
    getCurrentNavigation: () => ({extras: {state: {nuevoUsuario: {}}}})
  };

  const ActivatedRouteMock = {
    queryParams: {
      subscribe: () => {}
    }
  };

  const DatabaseServiceMock = {
    fetchUsuarioActual: () => ({subscribe: () => {}}),
    registrarUsuario: () => ({subscribe: () => {}}),
    registrarContactoEmergencia: () => ({subscribe: () => {}})
  };

  //constructor(private router: Router, private activatedroute: ActivatedRoute,private db: DatabaseService, private camara:CamaraService, private alert:AlertsService, private menucontroller: MenuController)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroFotoPerfilPage ],
      providers: [
        AlertsService,
        MenuController,
        CamaraService,
        { provide: Router, useValue: RouterMock },
        { provide: ActivatedRoute, useValue: ActivatedRouteMock },
        { provide: DatabaseService, useValue: {} }
      ]
    })

    fixture = TestBed.createComponent(RegistroFotoPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
