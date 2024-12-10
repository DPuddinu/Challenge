import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '@/directives/control-value-accessor.directive';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';

type InputType = 'text' | 'number' | 'email' | 'password';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationErrorsComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true
    }
  ],
  template: ` @if (control) {
    <div>
      <label
        [for]="label()"
        class="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
      >
        <input
          [required]="isRequired()"
          [type]="type()"
          [id]="inputId()"
          [formControl]="control"
          class="py-2 px-4 peer dark:text-white border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
          [placeholder]="label()"
        />

        <span
          class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white dark:bg-gray-900 p-0.5 text-xs text-gray-700 dark:text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
        >
          {{ label() }} 
        </span>
      </label>
      @if(control.touched && control.dirty) {
        <app-validation-errors [customErrorMessages]="customErrorMessages()" [errors]="control.errors">
        </app-validation-errors>
      }
    </div>
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputComponent<T> extends ControlValueAccessorDirective<T> {
  label = input<string>();
  type = input.required<InputType>();
  inputId = input<string>();
  customErrorMessages = input<Record<string, string>>({});
}
