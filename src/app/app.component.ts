import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ConfiguratorService } from './configurator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  readonly configuratorService = inject(ConfiguratorService);
  name = 'Angular';
}
