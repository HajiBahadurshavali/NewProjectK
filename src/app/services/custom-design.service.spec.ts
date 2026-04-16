import { TestBed } from '@angular/core/testing';

import { CustomDesignService } from './custom-design.service';

describe('CustomDesignService', () => {
  let service: CustomDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
