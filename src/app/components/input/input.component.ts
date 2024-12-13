import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BaseInputComponent } from '../base/base-input.component';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';

type InputType = 'text' | 'number' | 'email' | 'password';

@Component({
  selector: 'app-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  imports: [ReactiveFormsModule, ValidationErrorsComponent],
  template: ` @if (control) {
    <div>
      <label [for]="id()" class="block text-xs font-medium text-gray-500 dark:text-gray-200">
        {{ label() }}
      </label>
      <input
        [required]="isRequired()"
        [type]="type()"
        [id]="id()"
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
export class InputComponent<T> extends BaseInputComponent<T> {
  type = input.required<InputType>();
  customErrorMessages = input<Record<string, string>>({});
}
