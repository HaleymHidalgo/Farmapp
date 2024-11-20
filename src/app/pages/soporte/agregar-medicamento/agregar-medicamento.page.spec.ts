import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarMedicamentoPage } from './agregar-medicamento.page';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { IonicModule, MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/core/services/database.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AgregarMedicamentoPage', () => {
  let component: AgregarMedicamentoPage;
  let fixture: ComponentFixture<AgregarMedicamentoPage>;

  // Mocks y Spies
  const AlertsServiceMock = {
    mostrar: jasmine.createSpy('mostrar'),
  };

  const DatabaseServiceMock = {
    registrarMedicamento: jasmine.createSpy('registrarMedicamento'),
  };

  const MenuControllerMock = {
    enable: jasmine.createSpy('enable'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarMedicamentoPage],
      providers: [
        { provide: AlertsService, useValue: AlertsServiceMock },
        { provide: DatabaseService, useValue: DatabaseServiceMock },
        { provide: MenuController, useValue: MenuControllerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarMedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia habilitar el menú "soporte" e inhabilitar el menú "autocuidado" en ngOnInit', () => {
    component.ngOnInit();
    expect(MenuControllerMock.enable).toHaveBeenCalledWith(true, 'soporte');
    expect(MenuControllerMock.enable).toHaveBeenCalledWith(false, 'autocuidado');
  });

  it('Debe mostrar un error si el nombre del medicamento está vacío', () => {
    component.nombre_med = '';
    component.formato_med = 500;
    component.agregarMedicamento();
    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith(
      'Error',
      'El nombre del medicamento no puede estar vacio'
    );
  });

  it('Deberia mostrar un error si el formato del medicamento no está definido', () => {
    component.nombre_med = 'Paracetamol';
    component.agregarMedicamento();
    expect(AlertsServiceMock.mostrar).toHaveBeenCalledWith(
      'Error',
      'El gramaje del medicamento no puede estar vacio'
    );
  });

  it('Debe registrar un medicamento cuando los datos son válidos', () => {
    component.nombre_med = 'Ibuprofeno';
    component.formato_med = 200;
    component.agregarMedicamento();
    expect(DatabaseServiceMock.registrarMedicamento).toHaveBeenCalledWith('Ibuprofeno', 200);
  });

});