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
  public setConfig(id: number) {
    if (this.currentCarOptions()) {
      const config = this.currentCarOptions()!.configs.find((c) => c.id === id);
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
}
