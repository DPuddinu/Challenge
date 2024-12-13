import { FlightsFilterComponent } from '@/components/flights-filter/flights-filter.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-trips-page',
  imports: [CommonModule, ReactiveFormsModule, FlightsFilterComponent],
  template: ` <app-flights-filter /> `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsPageComponent {}
