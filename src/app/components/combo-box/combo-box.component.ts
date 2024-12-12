import { Component, forwardRef, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TagComponent } from '../tag/tag.component';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { ControlValueAccessorDirective } from '@/directives/control-value-accessor.directive';

@Component({
  selector: 'app-combo-box',
  imports: [CommonModule, FormsModule, TagComponent, ValidationErrorsComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboBoxComponent),
      multi: true
    }
  ],
  template: `
    @if (control) {
      <div class="flex flex-col gap-4">
        <div class="flex gap-2">
          <input
            #newTagInput
            type="text"
            (keyup.enter)="addTag(newTagInput.value)"
            placeholder="Enter a tag"
            class="px-3 py-2 border rounded-md flex-grow"
          />
          <button
            type="button"
            (click)="addTag(newTagInput.value)"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Add
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          @for (tag of tags(); track tag; let i = $index) {
            <app-tag [id]="i" [label]="tag" (onRemove)="removeTag(i)" />
          }
        </div>
        @if (control.touched && control.dirty) {
          <app-validation-errors [customErrorMessages]="customErrorMessages()" [errors]="control.errors">
          </app-validation-errors>
        }
      </div>
    }
  `
})
export class ComboBoxComponent extends ControlValueAccessorDirective<string[]> {
  tags = signal<string[]>([]);
  customErrorMessages = input<Record<string, string>>({});

  addTag(tag: string): void {
    if (tag.trim() && !this.tags().includes(tag.trim())) {
      const newTags = [...this.tags(), tag.trim()];
      this.tags.set(newTags);
      this.onChange(newTags);
      this.control?.markAsTouched();
    }
  }

  removeTag(index: number): void {
    const newTags = [...this.tags()];
    newTags.splice(index, 1);
    this.tags.set(newTags);
    this.onChange(newTags);
    this.control?.markAsTouched();
  }

  override writeValue(value: string[]): void {
    if (value) {
      this.tags.set(value);
    }
  }
}
