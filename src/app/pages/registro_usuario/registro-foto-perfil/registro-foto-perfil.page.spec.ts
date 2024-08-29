import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroFotoPerfilPage } from './registro-foto-perfil.page';

describe('RegistroFotoPerfilPage', () => {
  let component: RegistroFotoPerfilPage;
  let fixture: ComponentFixture<RegistroFotoPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroFotoPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
