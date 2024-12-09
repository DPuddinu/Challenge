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
      <input [required]="isRequired()" [type]="type()" [id]="inputId()" [formControl]="control" />
      <app-validation-errors [customErrorMessages]="customErrorMessages()" [errors]="control.errors">
      </app-validation-errors>
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
