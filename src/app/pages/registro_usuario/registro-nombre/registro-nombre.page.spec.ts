import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroNombrePage } from './registro-nombre.page';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/core/services/database.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuario';

describe('RegistroNombrePage', () => {
  let component: RegistroNombrePage;
  let fixture: ComponentFixture<RegistroNombrePage>; 
  
  const databaseServiceMock = {
    fetchUsuarioActual: jasmine.createSpy('fetchUsuarioActual').and.returnValue(new BehaviorSubject<Usuario>({id_usuario: 0,
      email: "",
      password: "",
      nombre: "",
      apellido_p: "",
      apellido_m: "",
      direccion: "",
      telefono: "",
      id_tipo_usuario: 0,
      id_pregunta: 0,
      res_seguridad: "",
      id_cont_emergencia: 0,
      img_url: "",
      activo: false
    }).asObservable()),
  };
  

  //constructor(private router: Router, private alertcontroller: AlertController, private db: DatabaseService, private alerts:AlertsService, private menucontroller: MenuController) { }
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroNombrePage ],
      providers: [
        Router,
        AlertController,
        AlertsService,
        MenuController,
        { provide: DatabaseService, useValue: databaseServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroNombrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
