import { Component, inject, OnInit } from '@angular/core';
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
export class Step2Component implements OnInit {
  service = inject(ConfiguratorService);
  readonly options = this.service.currentCarOptions();

  readonly configControl = new FormControl<string>(
    this.service.currentCarConfig()?.id.toString() || ''
  );

  readonly towHitchControl = new FormControl<boolean>(false);

  ngOnInit() {
    this.configControl.valueChanges.subscribe((id) => {
      if (id) {
        console.log(typeof id);
        this.service.setConfig(parseInt(id));
      }
    });

    this.towHitchControl.valueChanges.subscribe((tH) => {
      if (tH) {
        this.service.currentCarHitchYokeOptions.update((prev) => ({
          ...prev,
          towHitch: tH,
        }));
      }
    });
  }

  // toggleTowHitch(event: Event) {
  //   const checked = (event.target as HTMLInputElement).checked;
  //   this.service.currentCarHitchYokeOptions.update((prev) => ({
  //     ...prev,
  //     towHitch: checked,
  //   }));
  // }
  toggleYoke(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.service.currentCarHitchYokeOptions.update((prev) => ({
      ...prev,
      yoke: checked,
    }));
  }
}
