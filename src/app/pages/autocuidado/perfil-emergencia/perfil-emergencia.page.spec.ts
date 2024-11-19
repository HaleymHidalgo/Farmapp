import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilEmergenciaPage } from './perfil-emergencia.page';
import { DatabaseService } from 'src/app/core/services/database.service';
import { IonicModule, MenuController } from '@ionic/angular';
import { CamaraService } from 'src/app/core/services/camara.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PerfilEmergenciaPage', () => {
  let component: PerfilEmergenciaPage;
  let fixture: ComponentFixture<PerfilEmergenciaPage>;

  const DatabaseServiceMock = {
    fetchContactoEmergencia: jasmine.createSpy('fetchContactoEmergencia').and.returnValue(of({
      id_usuario: 1,
      id_tipo_usuario: 1,
      nombre: 'Juan',
      apellido_p: 'Pérez',
      apellido_m: 'González',
      email: 'juan.perez@example.com',
      telefono: '+56912345678',
      direccion: 'Calle Falsa 123',
      img_url: 'ruta/a/imagen.jpg'
    })),
    
    actualizarContactoEmergencia: jasmine.createSpy('actualizarContactoEmergencia'),

    buscarContactoEmergencia: jasmine.createSpy('buscarContactoEmergencia').and.returnValue(of({resolve:true})),

    eliminarContactoEmergencia: jasmine.createSpy('eliminarContactoEmergencia').and.returnValue(of({resolve:true}))
  };

  const routerMock = jasmine.createSpyObj('Router', ['navigate']);

  //constructor(private menucontroller: MenuController, private db:DatabaseService, private alert:AlertsService, private camara:CamaraService, private router:Router)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilEmergenciaPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        MenuController,
        CamaraService,
        AlertsService,
        Router,
        { provide: DatabaseService, useValue: DatabaseServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilEmergenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
