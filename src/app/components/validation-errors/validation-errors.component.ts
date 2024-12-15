import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

// Define specific types for each validation error
type ValidationErrorType = {
  required: undefined;
  minlength: { requiredLength: number; actualLength: number };
  maxlength: { requiredLength: number; actualLength: number };
  min: { min: number; actual: number };
  max: { max: number; actual: number };
  email: undefined;
  pattern: { requiredPattern: string; actualValue: string };
  passwordMismatch: undefined;
};

// Improve type safety for validation errors
type ValidationErrorKey = keyof ValidationErrorType;
type ValidationErrorValue<K extends ValidationErrorKey> = ValidationErrorType[K];

// Type-safe validation messages record
const DEFAULT_VALIDATION_MESSAGES: {
  [K in ValidationErrorKey]: (error: ValidationErrorValue<K>) => string;
} = {
  required: () => 'required',
  minlength: (error) => `minimum length is ${error.requiredLength} characters`,
  maxlength: (error) => `maximum length is ${error.requiredLength} characters`,
  min: (error) => `minimum value is ${error.min}`,
  max: (error) => `maximum value is ${error.max}`,
  email: () => 'invalid email format',
  pattern: () => 'invalid format',
  passwordMismatch: () => 'passwords do not match'
};

interface ErrorMessage {
  key: string;
  value: string;
}

@Component({
  selector: 'app-validation-errors',
  imports: [],
  template: `
  @if (errorMessages().length > 0) {
    <ul class="text-red-600 text-sm mt-1 space-y-1">
      @for (error of errorMessages(); track error.key) {
        <li>
          {{ error.value }}
        </li>
      }
    </ul>
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationErrorsComponent {
  errors = input<Partial<Record<ValidationErrorKey, ValidationErrorValue<ValidationErrorKey>>> | null>(null);
  customErrorMessages = input<Partial<Record<ValidationErrorKey, string>>>({});

  errorMessages = computed<ErrorMessage[]>(() => {
    const currentErrors = this.errors() || {};
    
    return Object.entries(currentErrors).map(([key, value]) => ({
      key,
      value: this.customErrorMessages()[key as ValidationErrorKey] || 
             (DEFAULT_VALIDATION_MESSAGES[key as ValidationErrorKey]?.(
               value as ValidationErrorType[typeof key extends ValidationErrorKey ? typeof key : never]
             ) ?? `Invalid: ${key}`)
    }));
  });
}
