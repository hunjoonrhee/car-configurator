import { Component, inject, OnInit } from '@angular/core';
import { ConfiguratorService } from '../configurator.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { combineLatest, startWith } from 'rxjs';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, AsyncPipe],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component implements OnInit {
  service = inject(ConfiguratorService);
  readonly options = this.service.currentModelOptionsSubject.value;

  readonly configControl = new FormControl<string>(
    this.service.currentCarConfigSubject.value?.id.toString() || ''
  );

  readonly hitchControl = new FormControl<boolean>(
    this.service.currentCarHitchYokeSubject.getValue().towHitch || false
  );
  readonly yokeControl = new FormControl<boolean>(
    this.service.currentCarHitchYokeSubject.getValue().yoke || false
  );

  ngOnInit() {
    this.configControl.valueChanges.subscribe((id) => {
      if (id) {
        const config = this.service.getConfig(parseInt(id));
        if (config) {
          this.service.setCurrentCarConfig(config);
        }
      }
    });

    this.hitchControl.valueChanges.subscribe((hitch) => {
      this.service.setCurrentCarHitchYoke({
        towHitch: hitch,
        yoke: this.yokeControl.value ?? false,
      });
    });

    this.yokeControl.valueChanges.subscribe((yoke) => {
      this.service.setCurrentCarHitchYoke({
        towHitch: this.hitchControl.value ?? false,
        yoke: yoke,
      });
    });

    // combineLatest([
    //   this.hitchControl.valueChanges.pipe(startWith(false)),
    //   this.yokeControl.valueChanges.pipe(startWith(false)),
    // ]).subscribe(([hitch, yoke]) => {
    //   this.service.setCurrentCarHitchYoke({ towHitch: hitch, yoke: yoke });
    // });
  }
}
