import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarModel, CarOptions, Color, Config } from './models.type';
import {
  BehaviorSubject,
  combineLatest,
  firstValueFrom,
  map,
  Observable,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService {
  private http = inject(HttpClient);
  readonly allModels$: Observable<CarModel[]> =
    this.http.get<CarModel[]>('models');

  readonly currentCarSubject = new BehaviorSubject<CarModel | null>(null);
  readonly currentCar$ = this.currentCarSubject.asObservable();
  readonly currentCarColorSubject = new BehaviorSubject<Color | null>(null);
  readonly currentCarColor$ = this.currentCarColorSubject.asObservable();
  readonly currentCarImageSubject = new BehaviorSubject<string | null>(null);
  readonly currentCarImage$ = this.currentCarImageSubject.asObservable();

  readonly currentModelOptionsSubject = new BehaviorSubject<CarOptions | null>(
    null
  );
  readonly currentModelOptions$ =
    this.currentModelOptionsSubject.asObservable();

  readonly currentCarConfigSubject = new BehaviorSubject<Config | null>(null);
  readonly currentCarConfig$ = this.currentCarConfigSubject.asObservable();

  readonly currentCarHitchYokeSubject = new BehaviorSubject<{
    towHitch: boolean | null;
    yoke: boolean | null;
  }>({ towHitch: null, yoke: null });
  readonly currentCarHitchYoke$ =
    this.currentCarHitchYokeSubject.asObservable();

  public getModelOptions(code: string): Observable<CarOptions> {
    return this.http.get<CarOptions>(`options/${code}`);
  }

  // ✅ setter
  setCurrentCar(car: CarModel) {
    this.currentCarSubject.next(car);
  }

  setCurrentCarColor(color: Color) {
    this.currentCarColorSubject.next(color);
  }

  setCurrentCarImage(url: string) {
    this.currentCarImageSubject.next(url);
  }

  setCurrentModelOptions(option: CarOptions) {
    this.currentModelOptionsSubject.next(option);
  }

  setCurrentCarConfig(config: Config) {
    this.currentCarConfigSubject.next(config);
  }

  setCurrentCarHitchYoke(hitchYoke: {
    towHitch: boolean | null;
    yoke: boolean | null;
  }) {
    this.currentCarHitchYokeSubject.next(hitchYoke);
  }

  public getConfig(configId: number): Config | undefined {
    const options = this.currentModelOptionsSubject.value;
    if (options) {
      const config = options!.configs.find((c) => c.id === configId);
      return config;
    } else {
      return undefined;
    }
  }

  readonly isStep2ready$: Observable<boolean> = combineLatest([
    this.currentCar$,
    this.currentCarColor$,
  ]).pipe(map(([car, color]) => car !== null && color !== null));

  readonly isStep3ready$: Observable<boolean> = combineLatest([
    this.isStep2ready$,
    this.currentCarConfig$,
    this.currentModelOptions$,
  ]).pipe(
    map(
      ([isStep2Ready, config, options]) =>
        isStep2Ready && config !== null && options !== null
    )
  );

  readonly currentCarTotalCost$: Observable<number> = combineLatest([
    this.currentCarConfig$,
    this.currentCarColor$,
    this.currentCarHitchYoke$,
  ]).pipe(
    map(([config, color, options]) => {
      const basicPrice = config?.price || 0;
      const colorPrice = color?.price || 0;
      const yokePrice = options.yoke ? 1000 : 0;
      const towHitchPrice = options.towHitch ? 1000 : 0;

      return basicPrice + colorPrice + yokePrice + towHitchPrice;
    })
  );
  // readonly currentCarTotalCost = computed(() => {
  //   const basicPrice = this.currentCarConfig()?.price || 0;
  //   const colorPrice = this.currentCarColor()?.price || 0;
  //   const yokePrice = this.currentCarHitchYokeOptions().yoke ? 1000 : 0;
  //   const towHitchPrice = this.currentCarHitchYokeOptions().towHitch ? 1000 : 0;

  //   return basicPrice + colorPrice + yokePrice + towHitchPrice;
  // });
}
