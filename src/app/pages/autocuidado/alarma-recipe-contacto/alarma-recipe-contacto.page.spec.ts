import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmaRecipeContactoPage } from './alarma-recipe-contacto.page';

describe('AlarmaRecipeContactoPage', () => {
  let component: AlarmaRecipeContactoPage;
  let fixture: ComponentFixture<AlarmaRecipeContactoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmaRecipeContactoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
