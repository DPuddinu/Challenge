import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-trips-page',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  template: `
    <app-pagination
      [currentPage]="currentPage()"
      [maxPages]="maxPages()"
      [totalPages]="totalPages()"
      (pageChange)="onPageChange($event)"
    />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsPageComponent {
  currentPage = signal(1);
  maxPages = signal(5);
  totalPages = signal(10);

  onPageChange(page: number) {
    console.log(page)
    this.currentPage.set(page);
  }
}
