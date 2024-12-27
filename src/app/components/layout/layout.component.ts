import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../base/icon/icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [IconComponent, RouterLink],
  template: ` <div class="grid grid-cols-1 grid-rows-[auto_1fr] h-full overflow-hidden">
    <header class="p-4 sticky top-0 flex items-center gap-4 bg-secondary-800 shadow shadow-secondary-600 text-secondary-content">
      <a routerLink="/"><app-icon name="house" [size]="24" fill="none" /></a>
      <h2 class="~text-lg/2xl" i18n>Trips</h2>
    </header>
    <main class="overflow-hidden">
      <ng-content></ng-content>
    </main>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {}
