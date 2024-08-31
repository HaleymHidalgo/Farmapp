import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmaConfirmarPage } from './alarma-confirmar.page';

describe('AlarmaConfirmarPage', () => {
  let component: AlarmaConfirmarPage;
  let fixture: ComponentFixture<AlarmaConfirmarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmaConfirmarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
