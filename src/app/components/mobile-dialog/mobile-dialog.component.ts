import { ChangeDetectionStrategy, Component, ElementRef, input, ViewChild, output } from '@angular/core';

@Component({
  selector: 'app-mobile-dialog',
  exportAs: 'mobileDialog',
  imports: [],
  template: `
    <dialog #dialog (close)="close()" class="mb-0 h-full w-auto overflow-hidden bg-transparent p-0 md:m-0">
      <div class="fixed bottom-0 w-full">
        <div id="popover-content" class="space-y-4 rounded-t-lg border-t border-t-base-300 bg-base-200 p-4 pb-0 ">
          <header class="flex items-center justify-between">
            <h4>{{ title() }}</h4>
            <form method="dialog">
              <button class="rounded text-warning transition-colors hover:text-primaryHover">
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
      </div>
    </dialog>
  `,
  styles: `
    dialog {
      --animation-duration: 0.3s;
      will-change: transform;
      transform: translateY(100%);
      transition:
        transform var(--animation-duration) ease-in-out,
        overlay var(--animation-duration) allow-discrete,
        display var(--animation-duration) allow-discrete;

      &[open] {
        transform: translateY(0);
        will-change: transform;
      }

      @starting-style {
        will-change: transform;
        &[open] {
          transform: translateY(100%);
        }
      }
      @screen md {
        display: hidden;
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
