import { inject } from '@angular/core';
import { Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  private readonly breakpointObserver = inject(BreakpointObserver);

  private readonly customBreakpoints = {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)'
  } as const;

  private readonly breakpointState = signal<Record<string, boolean>>({});

  readonly isSmall = computed(() => this.breakpointState()[this.customBreakpoints.sm]);
  readonly isMedium = computed(() => this.breakpointState()[this.customBreakpoints.md]);
  readonly isLarge = computed(() => this.breakpointState()[this.customBreakpoints.lg]);
  readonly isXLarge = computed(() => this.breakpointState()[this.customBreakpoints.xl]);
  readonly is2XLarge = computed(() => this.breakpointState()[this.customBreakpoints['2xl']]);

  readonly currentBreakpoint = computed<Breakpoint>(() => {
    if (this.is2XLarge()) return '2xl';
    if (this.isXLarge()) return 'xl';
    if (this.isLarge()) return 'lg';
    if (this.isMedium()) return 'md';
    return 'sm';
  });

  constructor() {
    this.breakpointObserver
      .observe(Object.values(this.customBreakpoints))
      .pipe(takeUntilDestroyed())
      .subscribe(result => {
        this.breakpointState.set(result.breakpoints);
      });
  }
}
