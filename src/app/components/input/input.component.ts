import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BaseInputComponent } from '../base/base-input.component';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { LabelComponent } from "../label/label.component";

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
        <app-label [text]="label()" [for]="id()"></app-label>
      }
      <input
        [required]="isRequired()"
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
        [placeholder]="placeholder()"
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
  @ViewChild('input') input!: ElementRef;
  type = input.required<InputType>();
}
