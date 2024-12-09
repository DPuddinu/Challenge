import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationButtonComponent } from './pagination-button.component';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, PaginationButtonComponent],
  template: `
    <ul class="flex gap-1 items-center">
      <li>
        <app-pagination-button
          label="First"
          [disabled]="previousDisabled"
          testIdAttr="first-button"
          i18nAttr="First button|The first button in the pagination"
          (onClick)="firstPage()"
        />
      </li>
      <li>
        <app-pagination-button
          label="Previous"
          [disabled]="previousDisabled"
          testIdAttr="previous-button"
          i18nAttr="Previous button|The previous button in the pagination"
          (onClick)="prevPage()"
        />
      </li>
      @for (page of visiblePageNumbers(); track $index) {
        <li>
          <app-pagination-button
            [label]="page >= 0 ? (page + 1).toString() : '...'"
            [disabled]="page === -1"
            [isActive]="currentPage() === page + 1"
            (onClick)="goToPage(page)"
            testIdAttr="page-button"
          />
        </li>
      }
      <li>
        <app-pagination-button
          label="Next"
          [disabled]="nextDisabled"
          i18nAttr="Next button|The next button in the pagination"
          testIdAttr="next-button"
          (onClick)="nextPage()"
        />
      </li>
      <li>
        <app-pagination-button
          label="Last"
          [disabled]="nextDisabled"
          i18nAttr="Last button|The last button in the pagination"
          testIdAttr="last-button"
          (onClick)="lastPage()"
        />
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  maxPages = input.required<number>();
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();

  visiblePageNumbers = computed(() => {
    const pagesToShow: number[] = [];

    if (this.totalPages() <= this.maxPages()) {
      for (let i = 0; i < this.totalPages(); i++) {
        pagesToShow.push(i);
      }
    } else {
      const halfMaxPages = Math.floor(this.maxPages() / 2);
      let startPage = Math.max(1, this.currentPage() - halfMaxPages);
      let endPage = Math.min(this.totalPages() - 1, startPage + this.maxPages() - 1);

      if (endPage - startPage + 1 < this.maxPages()) {
        startPage = endPage - this.maxPages() + 1;
      }

      if (startPage > 0) {
        pagesToShow.push(0);
        if (startPage > 1) {
          pagesToShow.push(-1); // for ellipsis
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i);
      }

      if (endPage < this.totalPages() - 1) {
        if (endPage < this.totalPages() - 2) {
          pagesToShow.push(-1); // for ellipsis
        }
        pagesToShow.push(this.totalPages() - 1);
      }
    }

    return pagesToShow;
  });

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 0) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  goToPage(page: number) {
    this.pageChange.emit(page + 1);
  }

  firstPage() {
    this.goToPage(0);
  }

  lastPage() {
    this.goToPage(this.totalPages() - 1);
  }
  get previousDisabled() {
    return this.currentPage() === 1;
  }
  get nextDisabled() {
    return this.currentPage() === this.totalPages();
  }
}
