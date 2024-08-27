import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroContactoPage } from './registro-contacto.page';

describe('RegistroContactoPage', () => {
  let component: RegistroContactoPage;
  let fixture: ComponentFixture<RegistroContactoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroContactoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
