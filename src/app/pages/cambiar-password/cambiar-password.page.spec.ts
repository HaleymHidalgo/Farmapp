import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarPasswordPage } from './cambiar-password.page';
import { DatabaseService } from 'src/app/core/services/database.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { Router } from '@angular/router';

describe('CambiarPasswordPage', () => {
  let component: CambiarPasswordPage;
  let fixture: ComponentFixture<CambiarPasswordPage>;

  const DatabaseServiceMock = {
    fetchUsuarioActual: () => {return {subscribe: () => {}}},
    obtenerUsuarioPorEmail: () => {}
  }

  const RouterMock = {
    getCurrentNavigation: () => {}
  }

  //constructor(private router: Router, private alerts:AlertsService, private db:DatabaseService, private activatedroute: ActivatedRoute) {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarPasswordPage ],
      providers: [
        AlertsService,
        { provide: DatabaseService, useValue: DatabaseServiceMock },
        { provide: Router, useValue: RouterMock }
      ]
    })
    fixture = TestBed.createComponent(CambiarPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
