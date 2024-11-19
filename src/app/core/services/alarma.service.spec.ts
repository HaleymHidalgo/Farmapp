import { TestBed } from '@angular/core/testing';

import { AlarmaService } from './alarma.service';
import { AlertsService } from './alerts.service';
import { DatabaseService } from './database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from '@angular/animations';

describe('AlarmaService', () => {
  let service: AlarmaService;

  const ActivatedRouteMock = {
    queryParams: {
      subscribe: () => {}
    }
  };

  const DatabaseServiceMock = {
    registrarAlarmas: () => {},
    cambiarEstadoAlarma: () => {},
  };

  beforeEach(() => {
    //constructor(private alert:AlertsService, private db:DatabaseService, private router:Router)
    TestBed.configureTestingModule({
      providers: [
        AlertsService,
        Router,
        { provide: ActivatedRoute, useValue: ActivatedRouteMock },
        { provide: DatabaseService, useValue: DatabaseServiceMock },
      ]
    });
    service = TestBed.inject(AlarmaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
