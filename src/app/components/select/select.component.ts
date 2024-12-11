import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '@/directives/control-value-accessor.directive';
import { ValidationErrorsComponent } from "../validation-errors/validation-errors.component";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationErrorsComponent],
  template: `@if (control) {
    <div>
      <label [for]="selectId()" class="block text-xs font-medium text-gray-500 dark:text-gray-200">
        {{ label() }}
      </label>
      <select
        [formControl]="control"
        [id]="selectId()"
        class="py-2 px-4 w-full rounded-md mt-1 h-10 bg-gray-500 dark:bg-gray-200 text-gray-500 dark:text-gray-500"
      >
        <option value="" hidden>{{ label() }}</option>
        <option *ngFor="let option of options()" [value]="option">
          {{ option }}
        </option>
      </select>
      @if (control.touched && control.dirty) {
        <app-validation-errors [customErrorMessages]="customErrorMessages()" [errors]="control.errors">
        </app-validation-errors>
      }
    </div>
  }`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent<T> extends ControlValueAccessorDirective<T> {
  options = input<T[]>();
  selectId = input<string>();
  label = input<string>();
  customErrorMessages = input<Record<string, string>>({});
}
