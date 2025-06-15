import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { step3Guard } from './step3.guard';

describe('step3Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => step3Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
