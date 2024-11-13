import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPasswordPage } from './registro-password.page';
import { MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('RegistroPasswordPage', () => {
  let component: RegistroPasswordPage;
  let fixture: ComponentFixture<RegistroPasswordPage>;

  const RouterMock = {
    getCurrentNavigation: () => ({extras: {state: {nuevoUsuario: {}}}})
  };

  const ActivatedRouteMock = {
    queryParams: {
      subscribe: () => {}
    }
  };

  //constructor(private router: Router, private activatedroute: ActivatedRoute, private alert:AlertsService, private menucontroller:MenuController)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPasswordPage ],
      providers: [
        AlertsService,
        MenuController,
        { provide: Router, useValue: RouterMock },
        { provide: ActivatedRoute, useValue: ActivatedRouteMock }
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
