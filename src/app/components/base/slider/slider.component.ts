import { ChangeDetectionStrategy, Component, computed, effect, input, model } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BaseInputComponent } from '../base-input.component';
import { LabelComponent } from '../label/label.component';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';

@Component({
  selector: 'app-slider',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SliderComponent,
      multi: true
    }
  ],
  imports: [LabelComponent, ValidationErrorsComponent, ReactiveFormsModule],
  template: `
    @if (rangeForm) {
      <div>
        @if (label()) {
          <app-label [text]="label()" [for]="id()" />
        }
        <div class="relative pt-1">
          <div
            class="absolute h-2 bg-primary-500 rounded-lg"
            [style.left]="selectedRangeLeft()"
            [style.width]="selectedRangeWidth()"
            style="top: 0.25rem;"
          ></div>

          <div class="relative h-2 bg-secondary-600 rounded-lg">
            <input
              type="range"
              [formControl]="rangeForm.controls.min"
              [min]="min()"
              [max]="max()"
              [step]="step()"
              [class]="rangeInputClass"
            />

            <input
              type="range"
              [formControl]="rangeForm.controls.max"
              [min]="min()"
              [max]="max()"
              [step]="step()"
              [class]="rangeInputClass"
            />
          </div>
        </div>

        <div class="flex justify-between mt-2 text-sm text-secondary-950">
          <span>{{ minValue() || min() }}</span>
          <span>{{ maxValue() || max() }}</span>
        </div>

        @if (rangeForm.touched && rangeForm.dirty) {
          <app-validation-errors [customErrorMessages]="customErrorMessages()" [errors]="rangeForm.errors" />
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent extends BaseInputComponent<{ min: number; max: number }> {
  min = input.required<number>();
  max = input.required<number>();
  step = input<number>(1);
  value = model<{ min: number; max: number }>();

  rangeForm = new FormGroup({
    min: new FormControl(),
    max: new FormControl()
  });

  minValue = toSignal(this.rangeForm.controls.min.valueChanges);
  maxValue = toSignal(this.rangeForm.controls.max.valueChanges);

  constructor() {
    super();

    effect(() => {
      this.rangeForm.controls.min.setValue(this.min(), { emitEvent: false });
      this.rangeForm.controls.max.setValue(this.max(), { emitEvent: false });
    });
    
    effect(() => {
      const minVal = this.minValue();
      const maxVal = this.maxValue();

      if (minVal !== null && maxVal !== null) {
        if (minVal > maxVal) {
          this.rangeForm.controls.min.setValue(maxVal, { emitEvent: false });
        }
        if (maxVal < minVal) {
          this.rangeForm.controls.max.setValue(minVal, { emitEvent: false });
        }

        this.value.set({ min: minVal, max: maxVal });
      }
    });
  }

  selectedRangeLeft = computed(() => {
    const currentMin = this.minValue() ?? this.min();
    const range = this.max() - this.min();
    const relativePosition = currentMin - this.min();
    const percentage = (relativePosition / range) * 100;

    return `${percentage}%`;
  });

  selectedRangeWidth = computed(() => {
    const range = this.max() - this.min();

    // Calculate left position percentage
    const currentMin = this.minValue() ?? this.min();
    const minRelativePosition = currentMin - this.min();
    const minPercentage = (minRelativePosition / range) * 100;

    // Calculate right position percentage
    const currentMax = this.maxValue() ?? this.max();
    const maxRelativePosition = currentMax - this.min();
    const maxPercentage = (maxRelativePosition / range) * 100;

    // Width is the difference between max and min positions
    return `${maxPercentage - minPercentage}%`;
  });

  override writeValue(value: { min: number; max: number }): void {
    if (value) {
      this.rangeForm.setValue({ min: value.min, max: value.max }, { emitEvent: false });
    }
  }

  protected readonly rangeInputClass = `absolute w-full h-2 appearance-none bg-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200 pointer-events-none
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:pointer-events-auto
    [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-primary-500
    [&::-webkit-slider-thumb]:cursor-pointer
    [&::-webkit-slider-thumb]:transition-all
    [&::-webkit-slider-thumb]:duration-200
    [&::-webkit-slider-thumb]:hover:bg-primary-600
    [&::-webkit-slider-thumb]:active:scale-95`;
}
