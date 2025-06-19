import { Component, inject } from '@angular/core';
import { ConfiguratorService } from '../configurator.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component {
  service = inject(ConfiguratorService);
  // readonly options = this.service.currentCarOptions();

  // readonly configControl = new FormControl<string>(
  //   this.service.currentCarConfig()?.id.toString() || ''
  // );

  // constructor() {
  //   this.configControl.valueChanges.subscribe((id) => {
  //     if (id) {
  //       console.log(typeof id);
  //       this.service.setConfig(parseInt(id));
  //     }
  //   });
  // }

  // toggleTowHitch(event: Event) {
  //   const checked = (event.target as HTMLInputElement).checked;
  //   this.service.currentCarHitchYokeOptions.update((prev) => ({
  //     ...prev,
  //     towHitch: checked,
  //   }));
  // }
  // toggleYoke(event: Event) {
  //   const checked = (event.target as HTMLInputElement).checked;
  //   this.service.currentCarHitchYokeOptions.update((prev) => ({
  //     ...prev,
  //     yoke: checked,
  //   }));
  // }
}
