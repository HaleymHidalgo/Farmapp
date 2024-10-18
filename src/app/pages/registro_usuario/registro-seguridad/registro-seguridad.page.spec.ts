import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroSeguridadPage } from './registro-seguridad.page';

describe('RegistroSeguridadPage', () => {
  let component: RegistroSeguridadPage;
  let fixture: ComponentFixture<RegistroSeguridadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroSeguridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
