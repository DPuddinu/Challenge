import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, signal, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { BaseInputComponent } from '@/components/base/base-input.component';
import { TagComponent } from '@/components/base/tag/tag.component';
import { ValidationErrorsComponent } from '@/components/base/validation-errors/validation-errors.component';
import { LabelComponent } from "@/components/base/label/label.component";
import { ButtonComponent } from "@/components/base/button/button.component";

@Component({
  selector: 'app-combo-box',
  imports: [CommonModule, FormsModule, TagComponent, ValidationErrorsComponent, LabelComponent, ButtonComponent],
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
      <app-label [text]="label()" [for]="id()"></app-label>
      <div class="flex flex-col gap-4">
        <div>
          <div class="flex gap-2">
            <input
              [id]="id()"
              #newTagInput
              type="text"
              (keyup.enter)="addTag(newTagInput.value)"
              placeholder="Enter tags"
              class="w-full h-10 px-4 py-2 rounded-md
               bg-secondary-600
               text-secondary-content
               placeholder:text-secondary-400 
               border border-secondary-600
               focus:outline-none focus:ring-2 focus:ring-primary-500
               disabled:bg-secondary-100 disabled:cursor-not-allowed
               transition-colors duration-200"
              (blur)="markAsTouched()"
            />
            <app-button variant="secondary" (click)="addTag(newTagInput.value)"> Add </app-button>
          </div>
          @if (control.touched && control.dirty) {
            <app-validation-errors [customErrorMessages]="customErrorMessages()" [errors]="control.errors">
            </app-validation-errors>
          }
        </div>
        <div class="flex flex-wrap gap-2">
          @for (tag of tags(); track tag; let i = $index) {
            <app-tag [id]="i" [label]="tag">
              <svg
                (click)="removeTag(i)"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="hover:scale-105"
              >
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </app-tag>
          }
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComboBoxComponent extends BaseInputComponent<string[]> implements Validator {
  @ViewChild('newTagInput') tagInput!: ElementRef;

  tags = signal<string[]>([]);

  addTag(tag: string): void {
    if (tag.trim() && !this.tags().includes(tag.trim())) {
      const newTags = [...this.tags(), tag.trim()];
      this.tags.set(newTags);
      this.onChange(newTags);
      this.markAsTouched();
      this.control?.markAsDirty();
      this.tagInput.nativeElement.value = '';
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
