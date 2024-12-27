import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';

type TRange = {
  min: number;
  max: number;
};

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
          <span>Min: {{ formGroup.value.min }}</span>
          <span>Max: {{ formGroup.value.max }}</span>
        </div>

        @if (formGroup.touched && formGroup.dirty) {
          <app-validation-errors [customErrorMessages]="customErrorMessages()" [errors]="formGroup.errors" />
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements ControlValueAccessor {
  min = input.required<number>();
  max = input.required<number>();

  formGroup = new FormGroup({
    min: new FormControl(),
    max: new FormControl()
  });

  step = input<number>(1);
  label = input<string>('');
  placeholder = input<string>('');
  id = input<string>('');
  customErrorMessages = input<Record<string, string>>({});

  private _onTouched!: () => void;
  private onChange!: (value: TRange | null) => void;

  constructor() {
    this.formGroup.valueChanges.pipe(takeUntilDestroyed()).subscribe((val) => {
      if (val.min > val.max) {
        this.formGroup.patchValue(
          {
            min: val.min,
            max: val.min
          },
          {
            emitEvent: false
          }
        );
        return;
      }
      if (val.max < val.min) {
        this.formGroup.patchValue(
          {
            min: val.max,
            max: val.max
          },
          {
            emitEvent: false
          }
        );
        return;
      }
      if (val.min !== undefined && val.max !== undefined && this.onChange) {
        this.onChange(val as TRange);
      }
      if (this._onTouched) {
        this._onTouched();
      }
    });
  }

  get minControl() {
    return this.formGroup?.get('min') as FormControl;
  }
  get maxControl() {
    return this.formGroup.get('max') as FormControl;
  }

  writeValue(value: TRange): void {
    if (this.formGroup && value) {
      this.formGroup.patchValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: (val: TRange | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.formGroup) {
      if (isDisabled) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
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
