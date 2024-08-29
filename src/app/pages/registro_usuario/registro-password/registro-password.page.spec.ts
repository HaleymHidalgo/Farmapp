import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPasswordPage } from './registro-password.page';

describe('RegistroPasswordPage', () => {
  let component: RegistroPasswordPage;
  let fixture: ComponentFixture<RegistroPasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
