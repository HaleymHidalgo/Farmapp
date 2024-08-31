import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmaMedicamentoPage } from './alarma-medicamento.page';

describe('AlarmaMedicamentoPage', () => {
  let component: AlarmaMedicamentoPage;
  let fixture: ComponentFixture<AlarmaMedicamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmaMedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
