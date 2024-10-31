import { TestBed } from '@angular/core/testing';

import { TokenStaplerInterceptor } from './token-stapler.interceptor';

describe('TokenStaplerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenStaplerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenStaplerInterceptor = TestBed.inject(TokenStaplerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
