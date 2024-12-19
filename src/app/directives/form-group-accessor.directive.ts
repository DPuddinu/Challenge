import { DestroyRef, Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormGroup } from '@angular/forms';
import { distinctUntilChanged, startWith, tap } from 'rxjs';

@Directive({
  selector: '[appFormGroupAccessor]',
  standalone: true
})
export class FormGroupAccessorDirective<T extends object> implements ControlValueAccessor {
  private destroyRef = inject(DestroyRef);
  formGroup: FormGroup | undefined;

  private _onTouched!: () => T;
  protected onChange!: (value: T) => void;


  writeValue(value: T): void {
    if (this.formGroup) {
      this.formGroup.patchValue(value, { emitEvent: false });
    } else {
      this.formGroup = new FormGroup({});
      this.formGroup.patchValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: (val: T | null) => void): void {
    this.onChange = fn;
    if (this.formGroup) {
      this.formGroup.valueChanges
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          startWith(this.formGroup.value),
          distinctUntilChanged(),
          tap(val => {
            fn(val);
            this.formGroup?.markAsUntouched();
          })
        )
        .subscribe();
    }
  }

  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.formGroup) {
      if (isDisabled) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
    }
  }
}
