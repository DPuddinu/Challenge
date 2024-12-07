import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trips-detail',
  standalone: true,
  imports: [CommonModule],
  template: `<p>trips-detail works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsDetailComponent {}
