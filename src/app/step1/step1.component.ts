import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CarModel, Color } from '../models.type';
import { ConfiguratorService } from '../configurator.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgIf],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
})
export class Step1Component implements OnInit {
  readonly configuratorService = inject(ConfiguratorService);
  readonly allModels$ = this.configuratorService.allModels$;
  readonly carModel = new FormControl<string>(
    this.configuratorService.currentCarSubject.getValue()?.description || ''
  );
  readonly carColor = new FormControl<string>(
    this.configuratorService.currentCarColorSubject.getValue()?.description ||
      ''
  );

  ngOnInit(): void {
    this.carModel.valueChanges.subscribe((m) => {
      this.allModels$.subscribe((models) => {
        const selectedModel = models.find((model) => model.description === m);
        if (selectedModel) {
          console.log(selectedModel);
          this.configuratorService.setCurrentCar(selectedModel);
          const firstColor = selectedModel.colors[0];
          if (firstColor) {
            this.configuratorService.setCurrentCarColor(firstColor);
            this.carColor.setValue(firstColor.code);
          }
        }
      });
    });

    this.carColor.valueChanges.subscribe((c) => {
      const currentCar = this.configuratorService.currentCarSubject.getValue();
      const currentColor = currentCar?.colors.find((color) => color.code === c);

      if (!currentColor || !currentCar) {
        return;
      }
      this.configuratorService.setCurrentCarColor(currentColor);
      const imageUrl = `https://interstate21.com/tesla-app/images/${currentCar.code}/${currentColor.code}.jpg`;
      this.configuratorService.setCurrentCarImage(imageUrl);
    });
  }

  // constructor() {
  //   this.carModel.valueChanges.subscribe((m) => {
  //     console.log(m);
  //     const currentModel = this.allModels.find(
  //       (model) => model.description === m
  //     );

  //     if (currentModel) {
  //       this.configuratorService.currentCar.set(currentModel);
  //       const firstColor = currentModel.colors[0];
  //       if (firstColor) {
  //         this.carColor.setValue(firstColor.code);
  //         this.configuratorService.currentCarColor.set(firstColor);
  //       }
  //       this.configuratorService.currentCarConfig.set(undefined);
  //     }
  //   });

  //   this.carColor.valueChanges.subscribe((c) => {
  //     const currentCar = this.configuratorService.currentCar();
  //     const currentColor = this.configuratorService
  //       .currentCar()
  //       ?.colors.find((color) => color.code === c);
  //     this.configuratorService.currentCarColor.set(currentColor);
  //     if (currentColor && currentCar) {
  //       const imageUrl = `https://interstate21.com/tesla-app/images/${currentCar.code}/${currentColor.code}.jpg`;
  //       this.configuratorService.currentCarImage.set(imageUrl);
  //     }
  //   });
  // }
}
