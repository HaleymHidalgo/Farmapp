import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { AlertsService } from './alerts.service';
import { Platform } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

const SQLiteMock = {
  create: jasmine.createSpy('create').and.returnValue(Promise.resolve({
    executeSql: () => Promise.resolve({ rows: { length: 0 } }),
    transaction: (callback: Function) => callback({
      executeSql: () => Promise.resolve({ rows: { length: 0 } })
    })
  }))
};

describe('DatabaseService', () => {
  let service: DatabaseService;

  //constructor(private sqlite:SQLite, private platform:Platform, private alerts:AlertsService)
  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [
        AlertsService,
        Platform,
        { provide: SQLite, useValue: SQLiteMock }
      ]
    });
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
