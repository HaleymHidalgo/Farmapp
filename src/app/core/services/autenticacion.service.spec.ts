import { TestBed } from '@angular/core/testing';

import { AutenticacionService } from './autenticacion.service';
import { Router } from '@angular/router';
import { AlertsService } from './alerts.service';
import { AlarmaService } from './alarma.service';
import { DatabaseService } from './database.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('AutenticacionService', () => {
  let service: AutenticacionService;

  const NativeStorageMock = {
    setItem: () => Promise.resolve(),
    getItem: () => Promise.resolve(1),
    remove: () => Promise.resolve()
  };

  const DatabaseServiceMock = {
    validarUsuario: jasmine.createSpy('validarUsuario').and.returnValue(Promise.resolve(true)),
    fetchUsuarioActual: jasmine.createSpy('fetchUsuarioActual').and.returnValue(Promise.resolve({ id_usuario: 1 })),
    obtenerUsuario: jasmine.createSpy('obtenerUsuario').and.returnValue(Promise.resolve({ id_usuario: 1, email: 'test@example.com' })),
    eliminarSesion: jasmine.createSpy('eliminarSesion').and.returnValue(Promise.resolve())
  };

  //constructor(private db:DatabaseService, private router:Router, private alert:AlertsService, private storage:NativeStorage, private alarma:AlarmaService)
  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [
        Router,
        AlertsService,
        AlarmaService,
        { provide: NativeStorage, useValue: NativeStorageMock },
        { provide: DatabaseService, useValue: DatabaseServiceMock }
      ]
    });
    service = TestBed.inject(AutenticacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
