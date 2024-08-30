import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarAlarmaPage } from './agregar-alarma.page';

describe('AgregarAlarmaPage', () => {
  let component: AgregarAlarmaPage;
  let fixture: ComponentFixture<AgregarAlarmaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAlarmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
