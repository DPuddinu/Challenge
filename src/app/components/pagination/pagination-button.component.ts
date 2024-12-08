import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination-button',
  template: `
    <button
      [attr.i18n]="i18nAttr()"
      [attr.data-testid]="testIdAttr()"
      class="px-3 py-2 rounded border border-gray-300 enabled:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      [class.bg-blue-500]="isActive()"
      [class.text-white]="isActive()"
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