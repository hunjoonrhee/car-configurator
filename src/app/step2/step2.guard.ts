import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ConfiguratorService } from '../configurator.service';
import { firstValueFrom } from 'rxjs';

export const step2Guard: CanActivateFn = async (route, state) => {
  const configuratorService = inject(ConfiguratorService);
  const isReady = await firstValueFrom(configuratorService.isStep2ready$);
  if (!isReady) {
    return false;
  } else {
    const currentCarModel = configuratorService.currentCarSubject.value;
    const options = configuratorService.getModelOptions(currentCarModel!.code);
    if (options) {
      options.subscribe((opt) =>
        configuratorService.setCurrentModelOptions(opt)
      );
    }
    return true;
  }
};
