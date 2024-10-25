import { TestBed } from '@angular/core/testing';

import { ReportIdService } from './report-id.service';

describe('ReportIdService', () => {
  let service: ReportIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
