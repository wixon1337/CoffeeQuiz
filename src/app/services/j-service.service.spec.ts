import { TestBed } from '@angular/core/testing';

import { JServiceService } from './j-service.service';

describe('JServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JServiceService = TestBed.get(JServiceService);
    expect(service).toBeTruthy();
  });
});
