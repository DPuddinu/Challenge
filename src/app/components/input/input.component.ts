import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '@/directives/control-value-accessor.directive';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';

type InputType = 'text' | 'number' | 'email' | 'password';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationErrorsComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: ` @if (control) {
    <div>
      <label [for]="inputId()" class="block text-xs font-medium text-gray-500 dark:text-gray-200">
        {{ label() }}
      </label>
      <input
        [required]="isRequired()"
        [type]="type()"
        [id]="inputId()"
        [formControl]="control"
        class="py-2 px-4 peer w-full rounded-md mt-1 h-10 bg-gray-500 dark:bg-gray-200 placeholder:text-gray-200 dark:placeholder:text-gray-500"
        [placeholder]="label()"
      />
      @if (control.touched && control.dirty) {
        <app-validation-errors [customErrorMessages]="customErrorMessages()" [errors]="control.errors">
        </app-validation-errors>
      }
    </div>
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent<T> extends ControlValueAccessorDirective<T> {
  label = input<string>();
  type = input.required<InputType>();
  inputId = input<string>();
  customErrorMessages = input<Record<string, string>>({});
}
