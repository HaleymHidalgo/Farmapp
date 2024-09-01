import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpcionesClientePage } from './opciones-cliente.page';

describe('OpcionesClientePage', () => {
  let component: OpcionesClientePage;
  let fixture: ComponentFixture<OpcionesClientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
