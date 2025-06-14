import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { step2Guard } from './step2.guard';

describe('step2Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => step2Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
