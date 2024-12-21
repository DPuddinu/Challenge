import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-pagination-button',
  imports: [NgClass],
  template: `
    <button
      [attr.i18n]="i18nAttr()"
      [attr.data-testid]="testIdAttr()"
      class="px-3 py-2 rounded border bg-secondary-700 text-secondary-500 enabled:hover:bg-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed"
      [ngClass]="{
        '!bg-secondary-400 !text-black': isActive()
      }"
      (click)="onClick.emit()"
      [disabled]="disabled()"
    >
      {{ label() }}
    </button>
  `
})
export class PaginationButtonComponent {
  label = input.required<string>();
  disabled = input(false);
  testIdAttr = input<string>();
  i18nAttr = input<string>();
  isActive = input(false);
  onClick = output<void>();
}