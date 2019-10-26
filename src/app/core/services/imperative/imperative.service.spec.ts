import { TestBed } from '@angular/core/testing';

import { ImperativeService } from './imperative.service';

describe('ImperativeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImperativeService = TestBed.get(ImperativeService);
    expect(service).toBeTruthy();
  });
});
