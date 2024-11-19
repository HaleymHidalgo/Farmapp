import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroFotoPerfilPage } from './registro-foto-perfil.page';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { CamaraService } from 'src/app/core/services/camara.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/core/services/database.service';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuario';

describe('RegistroFotoPerfilPage', () => {
  let component: RegistroFotoPerfilPage;
  let fixture: ComponentFixture<RegistroFotoPerfilPage>;

  const RouterMock = {
    getCurrentNavigation: () => ({extras: {state: {nuevoUsuario: {}}}}),
    navigate: jasmine.createSpyObj('Router', ['navigate'])
  };

  const ActivatedRouteMock = {
    queryParams: of({})
  }

  const NavControllerMock = {
    navigateForward: jasmine.createSpy('navigateForward'),
    navigateBack: jasmine.createSpy('navigateBack'),
  };

  const DatabaseServiceMock = {
    fetchUsuarioActual: () => of({}),
    registrarUsuario: () => {},
    registrarContactoEmergencia: () => of({})
  }

  //constructor(private router: Router, private activatedroute: ActivatedRoute,private db: DatabaseService, private camara:CamaraService, private alert:AlertsService, private menucontroller: MenuController)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroFotoPerfilPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        AlertsService,
        MenuController,
        CamaraService,
        { provide: Router, useValue: RouterMock },
        { provide: ActivatedRoute, useValue: ActivatedRouteMock },
        { provide: DatabaseService, useValue: DatabaseServiceMock },
        { provide: NavController, useValue: NavControllerMock }
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
