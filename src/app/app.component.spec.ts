import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AutenticacionService } from './core/services/autenticacion.service';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

describe('AppComponent', () => {

  const autenticacionServiceMock = jasmine.createSpyObj('AutenticacionService', ['obtenerUsuarioActual']);

  const ActivatedRouteMock = {
    queryParams: {
      subscribe: () => {}
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AutenticacionService, useValue: autenticacionServiceMock },
        { provide: ActivatedRoute, useValue: ActivatedRouteMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
