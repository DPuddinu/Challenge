import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tag',
  imports: [],
  template: `
    <div>
      {{ label() }}
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'px-2 py-1 rounded-full text-xs flex items-center gap-2 bg-yellow-400 font-bold text-gray-800'
  }
})
export class TagComponent {
  label = input<string>();
}
