import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  template: ` <ul class="pagination">
    <li
      class="paginate_button page-item first"
      id="dataTable_first"
      [ngClass]="currentPage() === 0 ? 'disabled' : ''"
    >
      <button
        i18n="First button|The first button in the pagination"
        class="page-link"
        (click)="firstPage()"
        [disabled]="currentPage() === 0"
      >
        First
      </button>
    </li>
    <li
      class="paginate_button page-item previous"
      [ngClass]="currentPage() === 0 ? 'disabled' : ''"
      id="dataTable_previous"
    >
      <button
        i18n="Previous button|The previous button in the pagination"
        class="page-link"
        (click)="prevPage()"
        [disabled]="currentPage() === 0"
      >
        Previous
      </button>
    </li>
    <li
      *ngFor="let page of pagesToShow()"
      [id]="page"
      class="paginate_button page-item"
      [ngClass]="currentPage() === page ? 'active' : ''"
    >
      <button
        class="page-link"
        (click)="goToPage(page)"
        [disabled]="page === -1"
      >
        {{ page >= 0 ? page + 1 : '...' }}
      </button>
    </li>
    <li
      id="dataTable_next"
      class="paginate_button page-item next"
      [ngClass]="nextDisabled ? 'disabled' : ''"
    >
      <button
        i18n="Next button|The next button in the pagination"
        class="page-link"
        (click)="nextPage()"
      >
        Next
      </button>
    </li>
    <li
      class="paginate_button page-item last"
      id="dataTable_last"
      [ngClass]="nextDisabled ? 'disabled' : ''"
    >
      <button
        i18n="Last button|The last button in the pagination"
        class="page-link"
        (click)="lastPage()"
      >
        Last
      </button>
    </li>
  </ul>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  maxPages = input.required<number>();
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();

  pagesToShow = computed(() => {
    const pagesToShow: number[] = [];

    if (this.totalPages() <= this.maxPages()) {
      for (let i = 0; i < this.totalPages(); i++) {
        pagesToShow.push(i);
      }
    } else {
      const halfMaxPages = Math.floor(this.maxPages() / 2);
      let startPage = Math.max(0, this.currentPage() - halfMaxPages);
      let endPage = Math.min(
        this.totalPages() - 1,
        startPage + this.maxPages() - 1
      );

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
    if (page !== -1) {
      this.pageChange.emit(page);
    }
  }

  firstPage() {
    this.pageChange.emit(0);
  }

  lastPage() {
    this.pageChange.emit(this.totalPages() - 1);
  }

  get nextDisabled() {
    return this.currentPage() === this.totalPages() - 1;
  }
}
