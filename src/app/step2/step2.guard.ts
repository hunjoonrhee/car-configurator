import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ConfiguratorService } from '../configurator.service';

export const step2Guard: CanActivateFn = async (route, state) => {
  const configuratorService = inject(ConfiguratorService);
  return true;
  // const isCarModelSelected = configuratorService.isCarModelSelected();

  // if (!isCarModelSelected) {
  //   return false;
  // } else {
  //   const currentCarModel = configuratorService.currentCar();
  //   const options = await configuratorService.getModelOptions(
  //     currentCarModel!.code
  //   );
  //   console.log(options);
  //   if (options) {
  //     configuratorService.currentCarOptions.set(options);
  //   }
  //   return true;
  // }
};
