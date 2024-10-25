import { TestBed } from '@angular/core/testing';

import { AnnotationIdService } from './annotation-id.service';

describe('AnnotationIdService', () => {
  let service: AnnotationIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnotationIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
