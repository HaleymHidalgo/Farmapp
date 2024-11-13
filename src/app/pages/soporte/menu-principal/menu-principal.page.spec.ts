import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPrincipalPage } from './menu-principal.page';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/core/services/database.service';
import { ListadoUsuarios } from 'src/app/core/models/listado-usuarios';
import { Observable } from 'rxjs';
import { ListadoMedicamentos } from 'src/app/core/models/listado-medicamentos';

describe('MenuPrincipalPage', () => {
  let component: MenuPrincipalPage;
  let fixture: ComponentFixture<MenuPrincipalPage>;

  const DatabaseServiceMock = {
    fetchListadoUsuarios: () => new Observable<ListadoUsuarios>(),
    fetchListadoMedicamentos: () => new Observable<ListadoMedicamentos>(),
    obtenerCredencialesUsuario: () => {},
    eliminarMedicamento: () => {},
  };

  //constructor(private menucontroller: MenuController, private db:DatabaseService, private router:Router)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPrincipalPage ],
      providers: [
        MenuController,
        Router,
        { provide: DatabaseService, useValue: DatabaseServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
