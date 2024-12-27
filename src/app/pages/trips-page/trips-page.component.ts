import { ButtonComponent } from '@/components/base/button/button.component';
import { MobileDialogComponent } from '@/components/base/mobile-dialog/mobile-dialog.component';
import { PaginationComponent } from '@/components/pagination/pagination.component';
import { BaseTripsFiltersComponent } from '@/components/trips-filter/base-trips-filters.component';
import { TripofthedayService } from '@/services/trip-of-the-day/trip-of-the-day.service';
import { TripsService } from '@/services/trips-service/trips.service';
import { ViewportService } from '@/services/viewport/viewport.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TripCardComponent } from '@/components/trip-card/trip-card.component';
import { TRIPS_PER_PAGE } from '@/services/trips-service/trips.constants';

@Component({
  selector: 'app-trips-page',
  imports: [
    CommonModule,
    MobileDialogComponent,
    PaginationComponent,
    BaseTripsFiltersComponent,
    TripCardComponent,
    ButtonComponent
  ],
  template: `
    <div class="lg:grid lg:grid-cols-[20%_1fr] h-full overflow-hidden">
      <section class="p-4 pb-0 lg:bg-secondary-800 w-full">
        @if (viewportService.isLarge()) {
          <aside class="flex flex-col gap-8 w-full">
            <h3 class="text-secondary-content font-bold text-lg">Filters</h3>
            @defer (when !!tripsService.tripsResource.value()) {
              <app-base-trips-filters></app-base-trips-filters>
            }
          </aside>
        } @else {
          @defer {
            <app-button [disabled]="tripsService.tripsResource.isLoading()" (onClick)="dialog.open()"
              >Filters</app-button
            >
            <app-mobile-dialog title="Filters" #dialog="mobileDialog">
              <app-base-trips-filters></app-base-trips-filters>
            </app-mobile-dialog>
          }
        }
      </section>
      <section>
        <div class="p-4 flex flex-col gap-4">
          <app-button (onClick)="loadTripOfTheDay()">Trip of the day</app-button>
          @if (tripOfTheDay | async; as trip) {
            @switch (trip.state) {
              @case ('loading') {
                <div class="text-white">loading...</div>
              }
              @case ('loaded') {
                <app-trip-card [trip]="trip.data"></app-trip-card>
              }
              @case ('error') {
                <div class="text-white">error loading trip of the day</div>
              }
            }
          }
        </div>
        @if (tripsService.tripsResource.isLoading()) {
          <div class="text-white">loading...</div>
        }
        @if (tripsService.tripsResource.error()) {
          <div class="text-white">error...</div>
        }
        <section #tripsContainer class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 2xl:grid-cols-4 overflow-y-auto">
          @for (trip of tripsService.tripsResource.value()?.items; track trip.id) {
            <app-trip-card [trip]="trip"></app-trip-card>
          }
        </section>
        @if (tripsService.tripsResource.value()?.items) {
          <div class="flex justify-center pb-4">
            <app-pagination
              [currentPage]="currentPage"
              [totalPages]="totalPages"
              (pageChange)="onPageChange($event)"
            ></app-pagination>
          </div>
        }
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsPageComponent {
  viewportService = inject(ViewportService);
  tripsService = inject(TripsService);
  tripOfTheDayService = inject(TripofthedayService);

  onPageChange(page: number) {
    this.tripsService.setQueryParam('page', page);
  }

  loadTripOfTheDay() {
    this.tripOfTheDayService.loadTripOfTheDay();
  }

  get tripOfTheDay() {
    return this.tripOfTheDayService.getTripOfTheDay();
  }

  get totalPages() {
    const total = this.tripsService.tripsResource.value()?.total;
    if (!total) return 1;
    return Math.ceil(total / TRIPS_PER_PAGE) ?? 1;
  }

  get currentPage() {
    return this.tripsService.tripsResource.value()?.page ?? 1;
  }
}
