import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPasswordPage } from './registro-password.page';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('RegistroPasswordPage', () => {
  let component: RegistroPasswordPage;
  let fixture: ComponentFixture<RegistroPasswordPage>;

  const RouterMock = {
    getCurrentNavigation: () => ({extras: {state: {nuevoUsuario: {}}}}),
    navigate: jasmine.createSpyObj('Router', ['navigate'])
  };

  const ActivatedRouteMock = {
    queryParams: {
      subscribe: () => {}
    }
  };

  const NavControllerMock = {
    navigateForward: jasmine.createSpy('navigateForward'),
    navigateBack: jasmine.createSpy('navigateBack'),
  };

  //constructor(private router: Router, private activatedroute: ActivatedRoute, private alert:AlertsService, private menucontroller:MenuController)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPasswordPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        AlertsService,
        MenuController,
        { provide: Router, useValue: RouterMock },
        { provide: ActivatedRoute, useValue: ActivatedRouteMock },
        { provide: NavController, useValue: NavControllerMock }
      ]
    })

    fixture = TestBed.createComponent(RegistroPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
