import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [attr.aria-disabled]="disabled()"
      (click)="onClick.emit()"
      [ngClass]="buttonClasses()"
      class="inline-flex items-center justify-center rounded-md font-medium transition-colors 
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
             disabled:pointer-events-none disabled:opacity-50 "
    >
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  onClick = output<void>();
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);

  private readonly variantClasses = computed(() => {
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-primary-500 text-primary-content hover:bg-primary-600',
      secondary: 'bg-secondary-500 text-secondary-content hover:bg-secondary-600',
      outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50'
    };
    return variants[this.variant()];
  });

  private readonly sizeClasses = computed(() => {
    const sizes: Record<ButtonSize, string> = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base'
    };
    return sizes[this.size()];
  });

  buttonClasses = computed(() => {
    return `${this.variantClasses()} ${this.sizeClasses()}`;
  });
} 