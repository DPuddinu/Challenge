import { ControlValueAccessorDirective } from '@/directives/control-value-accessor.directive';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-base-input',
  template: ''
})
export class BaseInputComponent<T> extends ControlValueAccessorDirective<T> {
  label = input<string>('');
  placeholder = input<string>('');
  id = input<string>('');
  customErrorMessages = input<Record<string, string>>({});
}
