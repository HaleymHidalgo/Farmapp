import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { AlertsService } from './alerts.service';
import { Platform } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('DatabaseService', () => {
  let service: DatabaseService;

  //constructor(private sqlite:SQLite, private platform:Platform, private alerts:AlertsService)
  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [
        AlertsService,
        Platform,
        SQLite
      ]
    });
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
