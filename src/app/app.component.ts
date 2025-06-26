import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ConfiguratorService } from './configurator.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AsyncPipe],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  readonly configuratorService = inject(ConfiguratorService);
  name = 'Angular';
}
