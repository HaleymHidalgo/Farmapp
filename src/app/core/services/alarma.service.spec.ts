import { TestBed } from '@angular/core/testing';

import { AlarmaService } from './alarma.service';
import { AlertsService } from './alerts.service';
import { DatabaseService } from './database.service';
import { Router } from '@angular/router';

describe('AlarmaService', () => {
  let service: AlarmaService;

  const databaseServiceMock = {
    registrarAlarmas: jasmine.createSpy('registrarAlarmas').and.returnValue(Promise.resolve()),
    cambiarEstadoAlarma: jasmine.createSpy('cambiarEstadoAlarma').and.returnValue(Promise.resolve()),
  };

  beforeEach(() => {
    //constructor(private alert:AlertsService, private db:DatabaseService, private router:Router)
    TestBed.configureTestingModule({
      providers: [
        AlertsService,
        Router,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ]
    });
    service = TestBed.inject(AlarmaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
