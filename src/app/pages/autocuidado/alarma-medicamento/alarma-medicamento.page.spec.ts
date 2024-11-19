import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmaMedicamentoPage } from './alarma-medicamento.page';
import { Router } from '@angular/router';
import { AlarmaService } from 'src/app/core/services/alarma.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { DatabaseService } from 'src/app/core/services/database.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

describe('AlarmaMedicamentoPage', () => {
  let component: AlarmaMedicamentoPage;
  let fixture: ComponentFixture<AlarmaMedicamentoPage>;

  const DatabaseServiceMock = {
    fetchListadoMedicamentos: () => of([]),
    registrarIndicacion: () => 0
  };

  //constructor(private db: DatabaseService, private alert:AlertsService, private router: Router, private alarma: AlarmaService)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmaMedicamentoPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        AlarmaService,
        AlertsService,
        Router,
        { provide: DatabaseService, useValue: DatabaseServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlarmaMedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
