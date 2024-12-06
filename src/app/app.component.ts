import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="p-4">
      <h1 i18n="site header|An introduction header for this sample">
        Hello i18n!
      </h1>
      <router-outlet />
    </div>
  `,
})
export class AppComponent {
  title = 'app-trips';
}
