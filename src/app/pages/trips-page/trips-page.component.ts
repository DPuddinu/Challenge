import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-trips-page',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  template: `
    <h1 i18n="Trips page header|The header for the trips page">Trips</h1>
    <app-pagination [currentPage]="1" [maxPages]="5" [totalPages]="10" />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsPageComponent {}
