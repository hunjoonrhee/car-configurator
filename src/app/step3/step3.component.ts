import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorService } from '../configurator.service';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule, AsyncPipe],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component {
  readonly service = inject(ConfiguratorService);
  readonly currentCarModel$ = this.service.currentCar$;
  readonly currentCarColor$ = this.service.currentCarColor$;
  readonly currentCarConfig$ = this.service.currentCarConfig$;
  readonly currentModelOptions$ = this.service.currentModelOptions$;
  readonly currentCarHitchYoke$ = this.service.currentCarHitchYoke$;
  readonly currentCarTotalCost$ = this.service.currentCarTotalCost$;
}
