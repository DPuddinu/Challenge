import { ButtonComponent } from '@/components/base/button/button.component';
import { IconComponent } from '@/components/base/icon/icon.component';
import { MobileDialogComponent } from '@/components/base/mobile-dialog/mobile-dialog.component';
import { TagComponent } from '@/components/base/tag/tag.component';
import { CardComponent } from '@/components/card/card.component';
import { PaginationComponent } from '@/components/pagination/pagination.component';
import { BaseTripsFiltersComponent } from '@/components/trips-filter/base-trips-filter/base-trips-filters/base-trips-filters.component';
import { Trip } from '@/models/Trip';
import { TripofthedayService } from '@/services/tripoftheday/tripoftheday.service';
import { TripsService } from '@/services/tripsService/tripsService.service';
import { ViewportService } from '@/services/viewport/viewport.service';
import { calculateScore, TripScore } from '@/utils/tripScore';
import { CommonModule, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-trips-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    NgOptimizedImage,
    TagComponent,
    IconComponent,
    NgTemplateOutlet,
    ButtonComponent,
    MobileDialogComponent,
    BaseTripsFiltersComponent,
    PaginationComponent
  ],
  template: `
    <div class="grid lg:grid-cols-[20%_1fr] h-full overflow-hidden">
      <section class="p-4 pb-0 grid lg:bg-secondary-700">
        @if (viewportService.isLarge()) {
          @defer {
            <aside class="flex flex-col gap-8 ">
              <h3 class="text-secondary-content font-bold text-lg">Filters</h3>
              <app-base-trips-filters></app-base-trips-filters>
            </aside>
          }
        } @else {
          @defer {
            <app-button (onClick)="dialog.open()">Filters</app-button>
            <app-mobile-dialog title="Filters" #dialog="mobileDialog">
              <app-base-trips-filters></app-base-trips-filters>
            </app-mobile-dialog>
          }
        }
      </section>
      <section>
        <section class="p-4 pb-0">
          <app-button (onClick)="fetchTripOfTheDay()">Trip of the day</app-button>
          @if (tripOfTheDay | async; as trip) {
            @switch (trip.state) {
              @case ('loading') {
                <div class="text-white">loading...</div>
              }
              @case ('loaded') {
                <div class="text-white">{{ trip.data.title }}</div>
              }
              @case ('error') {
                <div class="text-white">error loading trip of the day</div>
              }
            }
          }
        </section>
        @if (tripsService.tripsResource.isLoading()) {
          <div class="text-white">loading...</div>
        }
        @if (tripsService.tripsResource.error()) {
          <div class="text-white">error...</div>
        }
        @if (tripsService.tripsResource.value()) {
          <div>
            <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 2xl:grid-cols-4 overflow-y-auto">
              @for (flight of tripsService.tripsResource.value()?.items; track flight.id) {
                <app-card>
                  <ng-template #cardContent>
                    <div class="grid @sm:grid-cols-[max(30%,_200px)_1fr] @sm:items-center gap-4">
                      <div class="overflow-hidden rounded-lg aspect-square relative">
                        <img
                          [ngSrc]="flight.thumbnailUrl"
                          fill
                          priority
                          class="rounded-lg object-contain transition-all duration-300 group-hover:scale-110"
                          placeholder="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO89x8AAsEB3+IGkhwAAAAASUVORK5CYII="
                        />
                      </div>

                      <div class="space-y-2">
                        <div class="flex items-center justify-between gap-2">
                          <h4 class="~text-lg/2xl font-semibold w-fit ">{{ flight.title }}</h4>
                          <ng-container
                            *ngTemplateOutlet="tierTemplate; context: { $implicit: getTripScore(flight).tier }"
                          ></ng-container>
                          <ng-template #tierTemplate let-tier>
                            <app-icon [class]="tier.color" [name]="'crown'" fill="none" [size]="24" [strokeWidth]="2" />
                          </ng-template>
                        </div>
                        <div class="flex gap-2 items-center">
                          <span class="~text-sm/base">{{ flight.verticalType | titlecase }}</span>
                          <app-icon [name]="flight.verticalType" fill="none" [size]="16" [strokeWidth]="2" />
                        </div>
                        <div class="flex justify-between py-2">
                          <span class="~text-base/2xl font-semibold">{{ flight.price | currency: 'EUR' }}</span>
                        </div>
                        <div class="flex flex-wrap gap-2">
                          @for (tag of flight.tags; track tag) {
                            <app-tag [label]="tag" class="!bg-primary-500 w-fit"></app-tag>
                          }
                        </div>
                      </div>
                    </div>
                  </ng-template>
                </app-card>
              }
            </section>
          </div>
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

  fetchTripOfTheDay() {
    if (!this.tripOfTheDayService.getTripOfTheDay()) {
      this.tripOfTheDayService.loadTripOfTheDay();
    }
  }

  get tripOfTheDay() {
    return this.tripOfTheDayService.getTripOfTheDay();
  }

  get totalPages() {
    return this.tripsService.tripsResource.value()?.total ?? 1;
  }
  get currentPage() {
    return this.tripsService.tripsResource.value()?.page ?? 1;
  }

  getTripScore(flight: Trip): TripScore {
    return calculateScore({ rating: flight.rating, nrOfRatings: flight.nrOfRatings, co2: flight.co2 });
  }
}
