import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ConfiguratorService } from '../configurator.service';

export const step3Guard: CanActivateFn = (route, state) => {
  const configuratorService = inject(ConfiguratorService);

  if (configuratorService.isStep3ready()) {
    return true;
  } else {
    return false;
  }
};
