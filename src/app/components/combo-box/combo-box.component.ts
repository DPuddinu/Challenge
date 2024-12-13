import { Component, forwardRef, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { TagComponent } from '../tag/tag.component';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { BaseInputComponent } from '../base/base-input.component';

@Component({
  selector: 'app-combo-box',
  imports: [CommonModule, FormsModule, TagComponent, ValidationErrorsComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboBoxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ComboBoxComponent),
      multi: true
    }
  ],
  template: `
    @if (control) {
      <label [for]="id()" class="block text-xs font-medium text-gray-500 dark:text-gray-200">
        {{ label() }}
      </label>
      <div class="flex flex-col gap-4 mt-1">
        <div>
          <div class="flex gap-2">
            <input
              [id]="id()"
              #newTagInput
              type="text"
              (keyup.enter)="addTag(newTagInput.value)"
              placeholder="Enter a tag"
              class="px-3 py-2 border rounded-md flex-grow"
              (blur)="markAsTouched()"
            />
            <button
              type="button"
              (click)="addTag(newTagInput.value)"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Add
            </button>
          </div>
          @if (control.touched && control.dirty) {
            <app-validation-errors [customErrorMessages]="customErrorMessages()" [errors]="control.errors">
            </app-validation-errors>
          }
        </div>
        <div class="flex flex-wrap gap-2">
          @for (tag of tags(); track tag; let i = $index) {
            <app-tag [id]="i" [label]="tag" (onRemove)="removeTag(i)" />
          }
        </div>
      </div>
    }
  `
})
export class ComboBoxComponent extends BaseInputComponent<string[]> implements Validator {
  tags = signal<string[]>([]);
  customErrorMessages = input<Record<string, string>>({});

  addTag(tag: string): void {
    if (tag.trim() && !this.tags().includes(tag.trim())) {
      const newTags = [...this.tags(), tag.trim()];
      this.tags.set(newTags);
      this.onChange(newTags);
      this.markAsTouched();
      this.control?.markAsDirty();
    }
  }

  removeTag(index: number): void {
    const newTags = [...this.tags()];
    newTags.splice(index, 1);
    this.tags.set(newTags);
    this.onChange(newTags);
    this.markAsTouched();
  }

  override writeValue(value: string[]): void {
    if (value) {
      this.tags.set(value);
    }
  }
  markAsTouched(): void {
    this.control?.markAsTouched();
  }
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    if (!Array.isArray(control.value)) {
      return { invalidFormat: true };
    }

    const errors: ValidationErrors = {};

    // Check required
    if (control.hasValidator(Validators.required) && control.value.length === 0) {
      errors['required'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }
}
