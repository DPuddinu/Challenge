import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tag',
  imports: [],
  template: `
    <div class="px-2 py-1 rounded-full text-xs flex items-center gap-2 bg-yellow-400 font-bold text-gray-800">
      {{ label() }}
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  id = input.required<string | number>();
  label = input<string>();
}
