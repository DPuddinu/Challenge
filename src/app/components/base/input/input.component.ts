import { BaseInputComponent } from '@/components/base/base-input.component';
import { LabelComponent } from '@/components/base/label/label.component';
import { ValidationErrorsComponent } from '@/components/base/validation-errors/validation-errors.component';
import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

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
  exportAs: 'app-input',
  imports: [ReactiveFormsModule, ValidationErrorsComponent, LabelComponent],
  template: ` @if (control) {
    <div>
      @if (label()) {
        <app-label [text]="getLabelText()" [for]="id()"></app-label>
      }
      <input
        [type]="type()"
        [id]="id()"
        [formControl]="control"
        class="w-full h-10 px-4 py-2 rounded-md
               bg-secondary-600
               text-secondary-content
               placeholder:text-secondary-400 
               border border-secondary-600
               focus:outline-none focus:ring-2 focus:ring-primary-500
               disabled:bg-secondary-100 disabled:cursor-not-allowed
               transition-colors duration-200"
        [placeholder]="getPlaceholder()"
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

  protected getLabelText() {
    return $localize`${this.label()}`;
  }
  
  protected getPlaceholder() {
    return $localize`${this.placeholder()}`;
  }
}
