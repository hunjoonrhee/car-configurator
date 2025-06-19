import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarModel, CarOptions, Color, Config } from './models.type';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

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

  // readonly currentCarOptions = signal<CarOptions | undefined>(undefined);
  // readonly currentCarConfig = signal<Config | undefined>(undefined);
  // readonly currentCarHitchYokeOptions = signal<{
  //   towHitch: boolean;
  //   yoke: boolean;
  // }>({ towHitch: false, yoke: false });

  // readonly currentCarImage = signal<string | undefined>(undefined);
  // readonly isCarModelSelected = computed<boolean>(() => {
  //   return this.currentCar() ? true : false;
  // });

  // public getModelOptions(code: string): Observable<CarOptions> {
  //   return this.http.get<CarOptions>(`options/${code}`);
  // }

  // public setConfig(configId: number) {
  //   if (this.currentCarOptions()) {
  //     console.log(typeof this.currentCarOptions()!.configs[0].id);
  //     console.log(typeof configId);
  //     const config = this.currentCarOptions()!.configs.find(
  //       (c) => c.id === configId
  //     );
  //     console.log(config);
  //     this.currentCarConfig.set(config);
  //   }
  // }
  // readonly isStep3ready = computed<boolean>(() => {
  //   return this.currentCar() &&
  //     this.currentCarConfig() &&
  //     this.currentCarOptions()
  //     ? true
  //     : false;
  // });
  // readonly currentCarTotalCost = computed(() => {
  //   const basicPrice = this.currentCarConfig()?.price || 0;
  //   const colorPrice = this.currentCarColor()?.price || 0;
  //   const yokePrice = this.currentCarHitchYokeOptions().yoke ? 1000 : 0;
  //   const towHitchPrice = this.currentCarHitchYokeOptions().towHitch ? 1000 : 0;

  //   return basicPrice + colorPrice + yokePrice + towHitchPrice;
  // });
}
