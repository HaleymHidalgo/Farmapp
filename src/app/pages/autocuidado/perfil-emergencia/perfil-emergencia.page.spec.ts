import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilEmergenciaPage } from './perfil-emergencia.page';

describe('PerfilEmergenciaPage', () => {
  let component: PerfilEmergenciaPage;
  let fixture: ComponentFixture<PerfilEmergenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEmergenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
