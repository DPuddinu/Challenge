import { FormGroupAccessorDirective } from '@/directives/form-group-accessor.directive';
import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';

@Component({
  selector: 'app-slider',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SliderComponent,
      multi: true
    }
  ],
  imports: [LabelComponent, ValidationErrorsComponent, ReactiveFormsModule],
  template: `
    @if (formGroup) {
      <div>
        @if (label()) {
          <app-label [text]="label()" [for]="id()" />
        }
        <div class="relative pt-1">

          <div class="relative h-2 bg-secondary-600 rounded-lg">
            <input
              type="range"
              [formControl]="minControl"
              [min]="min()"
              [max]="max()"
              [step]="step()"
              [class]="rangeInputClass"
            />
            <input
              type="range"
              [formControl]="maxControl"
              [min]="min()"
              [max]="max()"
              [step]="step()"
              [class]="rangeInputClass"
            />
          </div>
        </div>

        <div class="flex justify-between mt-2 text-sm text-secondary-content">
          <span >Min: {{ minValue() }}</span>
          <span>Max: {{ maxValue() }}</span>
        </div>

        @if (formGroup.touched && formGroup.dirty) {
          <app-validation-errors [customErrorMessages]="customErrorMessages()" [errors]="formGroup.errors" />
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent extends FormGroupAccessorDirective<{ min: number; max: number }> {
  
  min = input.required<number>();
  max = input.required<number>();
  step = input<number>(1);
  label = input<string>('');
  placeholder = input<string>('');
  id = input<string>('');
  customErrorMessages = input<Record<string, string>>({});

  minValue;
  maxValue;

  constructor() {
    super();
    
    this.formGroup = new FormGroup({
      min: new FormControl(),
      max: new FormControl()
    });

    this.minValue = toSignal(this.formGroup.get('min')!.valueChanges);
    this.maxValue = toSignal(this.formGroup.get('max')!.valueChanges);

    effect(() => {
      const minVal = this.minValue();
      const maxVal = this.maxValue();
      if (minVal !== null && maxVal !== null && this.formGroup) {
        if (minVal > maxVal) {
          this.formGroup.get('min')?.setValue(maxVal, { emitEvent: false });
        }
        if (maxVal < minVal) {
          this.formGroup.get('max')?.setValue(minVal, { emitEvent: false });
        }
      }
    });
  }

  get minControl() {
    return this.formGroup?.get('min') as FormControl;
  }

  get maxControl() {
    return this.formGroup?.get('max') as FormControl;
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
