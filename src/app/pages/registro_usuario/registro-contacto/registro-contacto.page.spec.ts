import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroContactoPage } from './registro-contacto.page';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/core/services/database.service';
import { of } from 'rxjs';

describe('RegistroContactoPage', () => {
  let component: RegistroContactoPage;
  let fixture: ComponentFixture<RegistroContactoPage>;

  const RouterMock = {
    getCurrentNavigation: () => null
  };

  const DatabaseServiceMock = {
    fetchUsuarioActual: () => of({id_tipo_usuario: 1})
  };

  const ActivatedRouteMock = {
    queryParams: of({})
  };

  const NavControllerMock = {
    navigateForward: jasmine.createSpy('navigateForward'),
    navigateBack: jasmine.createSpy('navigateBack'),
  };

  //constructor(private router: Router, private activatedroute: ActivatedRoute, private alert:AlertsService, private db:DatabaseService, private menucontroller: MenuController)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [RegistroContactoPage],
      imports: [IonicModule.forRoot()],
      providers: [
        AlertsService,
        MenuController,
        {provide: Router, useValue: RouterMock},
        {provide: ActivatedRoute, useValue: ActivatedRouteMock},
        {provide: DatabaseService, useValue: DatabaseServiceMock},
        {provide: NavController, useValue: NavControllerMock}
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
