import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { BaseInputComponent } from '../base-input.component';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  imports: [CommonModule, ReactiveFormsModule, ValidationErrorsComponent, LabelComponent],
  template: `
  @if (control) {
    <div>
      @if (label()) {
        <app-label [text]="label()" [for]="id()"></app-label>
      }

      <select
        [formControl]="control"
        [id]="id()"
        class="w-full h-10 px-4 py-2 rounded-md
               bg-secondary-600
               text-secondary-content
               placeholder:text-secondary-400 
               border border-secondary-600
               focus:outline-none focus:ring-2 focus:ring-primary-500
               disabled:bg-secondary-100 disabled:cursor-not-allowed
               transition-colors duration-200"
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
}
