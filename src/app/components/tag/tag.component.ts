import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-tag',
  imports: [],
  template: `
  <button type="button" class="px-2 py-1 rounded-full text-xs flex items-center gap-2 bg-yellow-400 font-bold text-gray-800" (click)="remove()">
    {{ label() }}
    <svg
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
  </button>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  id = input.required<string | number>();
  label = input<string>();
  onRemove = output<string | number>();

  remove() {
    this.onRemove.emit(this.id());
  }
}
