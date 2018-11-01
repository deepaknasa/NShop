import { TestBed } from '@angular/core/testing';

import { NshopConfigService } from './nshop-config.service';

describe('NshopConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NshopConfigService = TestBed.get(NshopConfigService);
    expect(service).toBeTruthy();
  });
});
