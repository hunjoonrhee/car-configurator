import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ConfiguratorService } from '../configurator.service';
import { firstValueFrom } from 'rxjs';

export const step3Guard: CanActivateFn = async (route, state) => {
  const configuratorService = inject(ConfiguratorService);
  const isReady = await firstValueFrom(configuratorService.isStep3ready$);
  // return true;
  if (isReady) {
    return true;
  } else {
    return false;
  }
};
