import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarFarmaciaPage } from './buscar-farmacia.page';

describe('BuscarFarmaciaPage', () => {
  let component: BuscarFarmaciaPage;
  let fixture: ComponentFixture<BuscarFarmaciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarFarmaciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
