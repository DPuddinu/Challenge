import { ChangeDetectionStrategy, Component, computed, forwardRef, input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BaseInputComponent } from '../base-input.component';
import { LabelComponent } from '../label/label.component';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-slider',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ],
  imports: [LabelComponent, ValidationErrorsComponent, NgStyle, ReactiveFormsModule],
  template: `
    @if (control) {
      <div>
        @if (label()) {
          <app-label [text]="label()" [for]="id()"></app-label>
        }
        <div class="relative">
          <input
            type="range"
            [formControl]="control"
            [id]="id()"
            [min]="min()"
            [defaultValue]="min()"
            [max]="max()"
            [step]="step()"
            class="w-full h-2 appearance-none bg-secondary-600 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-all duration-200

                 [&::-webkit-slider-thumb]:appearance-none
                 [&::-webkit-slider-thumb]:w-4
                 [&::-webkit-slider-thumb]:h-4
                 [&::-webkit-slider-thumb]:rounded-full
                 [&::-webkit-slider-thumb]:bg-primary-500
                 [&::-webkit-slider-thumb]:cursor-pointer
                 [&::-webkit-slider-thumb]:transition-all
                 [&::-webkit-slider-thumb]:duration-200
                 [&::-webkit-slider-thumb]:hover:bg-primary-600
                 [&::-webkit-slider-thumb]:active:scale-95

                 [&::-moz-range-thumb]:appearance-none
                 [&::-moz-range-thumb]:w-4
                 [&::-moz-range-thumb]:h-4
                 [&::-moz-range-thumb]:rounded-full
                 [&::-moz-range-thumb]:bg-primary-500
                 [&::-moz-range-thumb]:border-0
                 [&::-moz-range-thumb]:cursor-pointer
                 [&::-moz-range-thumb]:transition-all
                 [&::-moz-range-thumb]:duration-200
                 [&::-moz-range-thumb]:hover:bg-primary-600
                 [&::-moz-range-thumb]:active:scale-95
                 [&::-moz-range-track]:bg-secondary-600
                 [&::-moz-range-track]:rounded-lg"
          />
          <div class="text-sm text-end" [ngStyle]="{ width: getLabelWidth(control.value, totalSteps()) }">
            {{ control.value || min() }}
          </div>
        </div>
        @if (control.touched && control.dirty) {
          <app-validation-errors [customErrorMessages]="customErrorMessages()" [errors]="control.errors">
          </app-validation-errors>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent extends BaseInputComponent<{ value: number; label: string }> implements OnInit {
  min = input.required<number>();
  max = input.required<number>();
  step = input<number>(1);
  totalSteps = computed(() => (this.max() - this.min()) / this.step());

  override ngOnInit() {
    super.ngOnInit();
    this.control?.setValue(this.min());
    // ...
  }

  getLabelWidth(value: number, totalSteps: number): string {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
    const percent = Math.floor((100 * value) / steps.length);
    if (percent === 0) {
      return 'fit-content';
    }
    if (value === steps.at(-1)) {
      return `${percent}%`;
    }
    return `calc(${percent}% + 1ch)`;
  }
}
