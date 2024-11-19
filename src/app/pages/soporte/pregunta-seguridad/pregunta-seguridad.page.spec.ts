import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreguntaSeguridadPage } from './pregunta-seguridad.page';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/core/services/database.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('PreguntaSeguridadPage', () => {
  let component: PreguntaSeguridadPage;
  let fixture: ComponentFixture<PreguntaSeguridadPage>;

  const DatabaseServiceMock = {
    fetchCredencialesUsuario: jasmine.createSpy('fetchCredencialesUsuario').and.returnValue(of({
      id_usuario: 1,
      pregunta: 'some text',
      res_seguridad: 'some text - response'
    })),
    obtenerCredencialesUsuario: () => {}
  };

  const routerMock = jasmine.createSpyObj('Router', ['navigate']);

  const NavControllerMock = {
    navigateForward: jasmine.createSpy('navigateForward'),
    navigateBack: jasmine.createSpy('navigateBack'),
  };

  //constructor(private router: Router, private db:DatabaseService, private alerts:AlertsService, private menucontroller:MenuController)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ PreguntaSeguridadPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        AlertsService,
        MenuController,
        { provide: DatabaseService, useValue: DatabaseServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: NavController, useValue: NavControllerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PreguntaSeguridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
