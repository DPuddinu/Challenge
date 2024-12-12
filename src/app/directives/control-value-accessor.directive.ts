import { Directive, inject, Injector, OnInit, DestroyRef, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  Validators,
  NgControl,
  FormControlName,
  FormGroupDirective,
  FormControlDirective
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith, distinctUntilChanged, tap } from 'rxjs';

@Directive({
  selector: '[appControlValueAccessor]',
  standalone: true
})
export class ControlValueAccessorDirective<T> implements ControlValueAccessor, OnInit {
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);

  control: FormControl | undefined;
  isRequired = signal(false);
  isDisabled = signal(false);
  
  private _onTouched!: () => T;
  protected onChange!: (value: T) => void;

  ngOnInit() {
    this.setFormControl();
    this.isRequired.set(this.control?.hasValidator(Validators.required) ?? false);
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
    if (this.control) {
      this.control.setValue(value); 
    } else {
      this.control = new FormControl(value);
    }
  }

  registerOnChange(fn: (val: T | null) => T): void {
    this.onChange = fn;
    this.control?.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(this.control.value),
        distinctUntilChanged(),
        tap(val => fn(val))
      )
      .subscribe(() => this.control?.markAsUntouched());
  }

  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
