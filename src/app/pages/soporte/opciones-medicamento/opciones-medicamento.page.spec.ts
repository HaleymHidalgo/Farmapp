import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpcionesMedicamentoPage } from './opciones-medicamento.page';

describe('OpcionesMedicamentoPage', () => {
  let component: OpcionesMedicamentoPage;
  let fixture: ComponentFixture<OpcionesMedicamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesMedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
