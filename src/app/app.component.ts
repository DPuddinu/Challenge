import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <div class="w-full ~max-w-[40rem]/[68rem] mx-auto"><router-outlet /></div> `
})
export class AppComponent {}

