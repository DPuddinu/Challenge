// src/app/components/shared/label/label.component.ts
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-label',
  template: `
    <label [for]="for()" class="block text-xs font-medium text-secondary-950 mb-1">
      {{ text() }}
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent {
  text = input.required<string>();
  for = input.required<string>();
}
