import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmaRecipePage } from './alarma-recipe.page';

describe('AlarmaRecipePage', () => {
  let component: AlarmaRecipePage;
  let fixture: ComponentFixture<AlarmaRecipePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmaRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
