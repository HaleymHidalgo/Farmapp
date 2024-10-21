import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoPasswordPage } from './codigo-password.page';

describe('CodigoPasswordPage', () => {
  let component: CodigoPasswordPage;
  let fixture: ComponentFixture<CodigoPasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
