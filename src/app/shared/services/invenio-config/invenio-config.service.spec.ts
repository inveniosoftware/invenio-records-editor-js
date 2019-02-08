import { TestBed, inject } from '@angular/core/testing';

import { InvenioConfigService } from './invenio-config.service';

describe('InvenioConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvenioConfigService]
    });
  });
  it(
    'should have a service instance',
    inject([InvenioConfigService], (service: InvenioConfigService) => {
      expect(service).toBeDefined();
    })
  );
});
