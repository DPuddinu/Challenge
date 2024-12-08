import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-pagination-button',
  imports: [NgClass],
  template: `
    <button
      [attr.i18n]="i18nAttr()"
      [attr.data-testid]="testIdAttr()"
      class="px-3 py-2 rounded border border-gray-300 enabled:hover:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
      [ngClass]="{
        'bg-blue-500 text-white': isActive(),
      }"
      (click)="onClick.emit()"
      [disabled]="disabled()"
    >
      {{ label() }}
    </button>
  `,
})
export class PaginationButtonComponent {
  label = input.required<string>();
  disabled = input(false);
  testIdAttr = input<string>();
  i18nAttr = input<string>();
  isActive = input(false);
  onClick = output<void>();
}