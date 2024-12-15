import { ChangeDetectionStrategy, Component, ElementRef, input, ViewChild, output } from '@angular/core';

@Component({
  selector: 'app-mobile-dialog',
  exportAs: 'mobileDialog',
  imports: [],
  template: `
    <dialog #dialog (close)="close()" class="bg-transparent mb-0 mx-0">
      <div class="space-y-4 rounded-t-lg p-4 pb-0 bg-secondary-400">
        <header class="flex items-center justify-between">
          <h4 class=" text-secondary-content font-bold text-lg">{{ title() }}</h4>
          <form method="dialog">
            <button class="rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                class="size-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </form>
        </header>
        <ng-content></ng-content>
      </div>
    </dialog>
  `,
  styles: `
    dialog {
      --animation-duration: 0.3s;
      will-change: transform;
      width: 100vw;
      max-width: 100vw;
      transform: translateY(100%);
      transition:
        transform var(--animation-duration) ease-in-out,
        overlay var(--animation-duration) allow-discrete,
        display var(--animation-duration) allow-discrete;
     
      &[open] {
        transform: translateY(0);
      }

      @starting-style {
        &[open] {
          transform: translateY(100%);
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileDialogComponent {
  @ViewChild('dialog') dialogElement!: ElementRef<HTMLDialogElement>;

  title = input.required();
  closed = output<void>();

  open() {
    this.dialogElement.nativeElement.showModal();
  }

  close() {
    this.dialogElement.nativeElement.close();
    this.closed.emit();
  }
}
