import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroNombrePage } from './registro-nombre.page';

describe('RegistroNombrePage', () => {
  let component: RegistroNombrePage;
  let fixture: ComponentFixture<RegistroNombrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroNombrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
