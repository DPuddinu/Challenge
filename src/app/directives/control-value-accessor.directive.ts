import { DestroyRef, Directive, inject, Injector, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl
} from '@angular/forms';
import { distinctUntilChanged, startWith } from 'rxjs';

@Directive({
  selector: '[appControlValueAccessor]',
  standalone: true
})
export class ControlValueAccessorDirective<T> implements ControlValueAccessor, OnInit {
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);

  control: FormControl | undefined;
  isDisabled = signal(false);
  
  private _onTouched!: () => T;
  protected onChange!: (value: T) => void;

  ngOnInit() {
    this.setFormControl();
  }

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);

      switch (formControl.constructor) {
        case FormControlName:
          this.control = this.injector.get(FormGroupDirective).getControl(formControl as FormControlName);
          break;
        default:
          this.control = (formControl as FormControlDirective).form as FormControl;
          break;
      }
    } catch (_err) {
      this.control = new FormControl();
    }
  }

  writeValue(value: T): void {
    if (!this.control) {
      this.control = new FormControl(value);
      return;
    }
    if (this.control.value !== value) {
      if (value === null || value === undefined) {
        this.control.reset(null, { emitEvent: false });
      } else {
        this.control.setValue(value, { emitEvent: false });
      }
    }
  }

  registerOnChange(fn: (val: T | null) => T): void {
    this.onChange = fn;
    if (this.control) {
      this.control.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef), startWith(this.control.value), distinctUntilChanged())
        .subscribe(val => {
          fn(val);
        });
    }
  }

  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.control) {
      if (isDisabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  }
}
