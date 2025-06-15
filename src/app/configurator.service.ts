import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarModel, CarOptions, Color, Config } from './models.type';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService {
  private http = inject(HttpClient);
  readonly allModels: Signal<CarModel[]> = toSignal(
    this.http.get<CarModel[]>('models'),
    { initialValue: [] }
  );

  readonly currentCar = signal<CarModel | undefined>(undefined);
  readonly currentCarColor = signal<Color | undefined>(undefined);
  readonly currentCarOptions = signal<CarOptions | undefined>(undefined);
  readonly currentCarConfig = signal<Config | undefined>(undefined);
  readonly currentCarHitchYokeOptions = signal<{
    towHitch: boolean;
    yoke: boolean;
  }>({ towHitch: false, yoke: false });

  readonly currentCarImage = signal<string | undefined>(undefined);
  readonly isCarModelSelected = computed<boolean>(() => {
    return this.currentCar() ? true : false;
  });

  public async getModelOptions(code: string) {
    const options = await firstValueFrom(
      this.http.get<CarOptions>(`options/${code}`)
    );
    return options;
  }
  public setConfig(configId: number) {
    if (this.currentCarOptions()) {
      console.log(typeof this.currentCarOptions()!.configs[0].id);
      console.log(typeof configId);
      const config = this.currentCarOptions()!.configs.find(
        (c) => c.id === configId
      );
      console.log(config);
      this.currentCarConfig.set(config);
    }
  }
  readonly isStep3ready = computed<boolean>(() => {
    return this.currentCar() &&
      this.currentCarConfig() &&
      this.currentCarOptions()
      ? true
      : false;
  });
  readonly currentCarTotalCost = computed(() => {
    const basicPrice = this.currentCarConfig()?.price || 0;
    const colorPrice = this.currentCarColor()?.price || 0;
    const yokePrice = this.currentCarHitchYokeOptions().yoke ? 1000 : 0;
    const towHitchPrice = this.currentCarHitchYokeOptions().towHitch ? 1000 : 0;

    return basicPrice + colorPrice + yokePrice + towHitchPrice;
  });
}
