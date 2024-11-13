import { TestBed } from '@angular/core/testing';

import { EmailService } from './email.service';
import { AlertsService } from './alerts.service';
import { HttpClient } from '@angular/common/http';

describe('EmailService', () => {
  let service: EmailService;

  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

  //constructor(private alert:AlertsService, private http: HttpClient)
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertsService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(EmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
