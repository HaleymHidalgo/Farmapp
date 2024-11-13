import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarMedicamentoPage } from './agregar-medicamento.page';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/core/services/database.service';

describe('AgregarMedicamentoPage', () => {
  let component: AgregarMedicamentoPage;
  let fixture: ComponentFixture<AgregarMedicamentoPage>;

  const DatabaseServiceMock = {
    registrarMedicamento: () => {}
  }

  //constructor(private db:DatabaseService, private alerts:AlertsService, private menucontroller:MenuController)
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMedicamentoPage ],
      providers: [
        AlertsService,
        MenuController,
        { provide: DatabaseService, useValue: DatabaseServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarMedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
