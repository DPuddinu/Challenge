import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  standalone: true,
  imports: [],
  template: ` <ul class="text-red-600 text-sm mt-1 space-y-1">
    @for (error of errorMessages(); track error.key) {
      <li>
        {{ error.value }}
      </li>
    }
  </ul>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationErrorsComponent {
  errors = input<Record<string, ValidationErrors> | null>(null);
  customErrorMessages = input<Record<string, string>>({});

  errorMessages = computed(() => {
    return Object.entries(this.errors() || {}).map(([key, value]) => ({
      key,
      value: this.customErrorMessages()[key] || value || `Invalid: ${key}`
    }));
  });
}
