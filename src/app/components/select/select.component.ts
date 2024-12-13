import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { BaseInputComponent } from '../base/base-input.component';

@Component({
  selector: 'app-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  imports: [CommonModule, ReactiveFormsModule, ValidationErrorsComponent],
  template: ` @if (control) {
    <div>
      <label [for]="id()" class="block text-xs font-medium text-gray-500 dark:text-gray-200">
        {{ label() }}
      </label>
      <select
        [formControl]="control"
        [id]="id()"
        class="py-2 px-4 w-full rounded-md mt-1 h-10 bg-gray-500 dark:bg-gray-200 text-gray-500 dark:text-gray-500"
      >
        <option value="" hidden>{{ label() }}</option>
        @for (option of options(); track option.value) {
          <option [value]="option.value">
            {{ option.label }}
          </option>
        }
      </select>
      @if (control.touched && control.dirty) {
        <app-validation-errors [customErrorMessages]="customErrorMessages()" [errors]="control.errors">
        </app-validation-errors>
      }
    </div>
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends BaseInputComponent<{ value: string | number; label: string }> {
  options = input<{ value: string | number; label: string }[]>();
  customErrorMessages = input<Record<string, string>>({});
}
