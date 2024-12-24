import { Directive, HostListener, input } from '@angular/core';

@Directive({
  selector: 'img[fallbackSrc]'
})
export class FallbackImageDirective {

  fallbackSrc = input.required<string>();

  @HostListener('error', ['$event'])
  onError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (this.fallbackSrc) {
      target.src = this.fallbackSrc();
    }
  }
}
