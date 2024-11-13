import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpcionesClientePage } from './opciones-cliente.page';
import { DatabaseService } from 'src/app/core/services/database.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/core/services/alerts.service';

describe('OpcionesClientePage', () => {
  let component: OpcionesClientePage;
  let fixture: ComponentFixture<OpcionesClientePage>;

  const DatabaseServiceMock = {
    fetchCredencialesUsuario: () => {
      return { subscribe: () => {} };
    }
  };

  //constructor(private menucontroller: MenuController, private router: Router, private db:DatabaseService, private alerts:AlertsService)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionesClientePage ],
      providers: [
        MenuController,
        Router,
        AlertsService,
        { provide: DatabaseService, useValue: DatabaseServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OpcionesClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
