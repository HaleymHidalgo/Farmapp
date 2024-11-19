import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { DatabaseService } from 'src/app/core/services/database.service';
import { AlertController, IonicModule, MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { CamaraService } from 'src/app/core/services/camara.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  const DatabaseServiceMock = {
    fetchUsuarioActual: jasmine.createSpy('fetchUsuarioActual').and.returnValue(of({
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
    actualizarUsuario: jasmine.createSpy('actualizarUsuario').and.returnValue(Promise.resolve(true)),
    buscarContactoEmergencia: jasmine.createSpy('buscarContactoEmergencia').and.returnValue(Promise.resolve(true)),
  };

  const routerMock = jasmine.createSpyObj('Router', ['navigate']);

  //constructor(private menucontroller: MenuController, private db:DatabaseService, private alert:AlertsService, private camara:CamaraService, private router:Router, private alerta:AlertController)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        MenuController,
        AlertsService,
        CamaraService,
        AlertController,
        Router,
        { provide: DatabaseService, useValue: DatabaseServiceMock },
      ]
    })
    
    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
