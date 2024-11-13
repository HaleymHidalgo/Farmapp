import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreguntaSeguridadPage } from './pregunta-seguridad.page';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/core/services/database.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CredencialesUsuario } from 'src/app/core/models/credenciales-usuario';

describe('PreguntaSeguridadPage', () => {
  let component: PreguntaSeguridadPage;
  let fixture: ComponentFixture<PreguntaSeguridadPage>;

  const DatabaseServiceMock = {
    fetchCredencialesUsuario: () => new Observable<CredencialesUsuario>(),
    obtenerCredencialesUsuario: () => {}
  };

  //constructor(private router: Router, private db:DatabaseService, private alerts:AlertsService, private menucontroller:MenuController)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ PreguntaSeguridadPage ],
      providers: [
        AlertsService,
        MenuController,
        { provide: DatabaseService, useValue: DatabaseServiceMock },
        { provide: Router, useValue: {} }
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
