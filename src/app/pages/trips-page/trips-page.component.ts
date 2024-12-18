import { CardComponent } from '@/components/card/card.component';
import { IconComponent } from '@/components/base/icon/icon.component';
import { TagComponent } from '@/components/base/tag/tag.component';
import { Trip } from '@/models/Trip';
import { FlightResponse } from '@/services/flightService/flight.types';
import { calculateScore, TripScore } from '@/utils/tripScore';
import { CommonModule, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MobileTripsFilterComponent } from '@/components/trips-filter/mobile-trips-filter/mobile-trips-filter.component';
import { DesktopTripsFilterComponent } from '@/components/trips-filter/desktop-trips-filter/desktop-trips-filter.component';

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
    MobileTripsFilterComponent,
    DesktopTripsFilterComponent
  ],
  template: `
    <div class="grid xl:grid-cols-[auto_1fr]">
      <section class="p-4">
        <div class="hidden 2xl:block">
          <app-desktop-trips-filter></app-desktop-trips-filter>
        </div>
        <div class="block 2xl:hidden">
          <app-flights-filter-mobile></app-flights-filter-mobile>
        </div>
      </section>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 2xl:grid-cols-4">
        <!-- @if (flightsService.flightsResource.isLoading()) {
      <div class="text-white">loading...</div>
    }
    @if (flightsService.flightsResource.error()) {
      <div class="text-white">error...</div>
    } -->

        @for (flight of data.items; track flight.id) {
          <app-card>
            <ng-template #cardContent>
              <div class="grid @md:grid-cols-[max(30%,_200px)_1fr] @md:items-center gap-4">
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
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsPageComponent {
  // flightsService = inject(FlightService);
  data: FlightResponse = {
    items: [
      {
        id: '57be77a0-a37f-44f9-902d-445d78d781ee',
        title: 'Trip to Budapest',
        description: 'A beautiful journey through the city of lights',
        price: 4096.2,
        rating: 4.1,
        nrOfRatings: 363,
        verticalType: 'train',
        tags: ['food', 'history', 'culture'],
        co2: 297.8,
        thumbnailUrl: 'https://picsum.photos/id/511/200/200',
        imageUrl: 'https://picsum.photos/id/511/600/800',
        creationDate: new Date('2024-10-20T19:40:20.747Z')
      },
      {
        id: '3fd26f38-f077-4eb2-935d-aec6b650dfe9',
        title: 'Trip to Seoul',
        description: 'A beautiful journey through the city of lights',
        price: 1050.57,
        rating: 3,
        nrOfRatings: 212,
        verticalType: 'train',
        tags: ['business', 'shopping', 'culture'],
        co2: 156.8,
        thumbnailUrl: 'https://picsum.photos/id/339/200/200',
        imageUrl: 'https://picsum.photos/id/339/600/800',
        creationDate: new Date('2024-10-20T19:40:20.761Z')
      },
      {
        id: 'ad34a7c8-a483-4376-80a6-e02c85a6a0d9',
        title: 'Trip to Sydney',
        description: 'A beautiful journey through the eternal city',
        price: 2581.19,
        rating: 1.7,
        nrOfRatings: 242,
        verticalType: 'flight',
        tags: ['history', 'business', 'culture'],
        co2: 600.3,
        thumbnailUrl: 'https://picsum.photos/id/120/200/200',
        imageUrl: 'https://picsum.photos/id/120/600/800',
        creationDate: new Date('2024-10-20T19:40:20.766Z')
      },
      {
        id: '45151481-434b-47c9-b96f-6b4cc74c05fb',
        title: 'Trip to Hanoi',
        description: 'A beautiful journey through the eternal city',
        price: 4403.24,
        rating: 4,
        nrOfRatings: 976,
        verticalType: 'hotel',
        tags: ['shopping', 'nature'],
        co2: 207.7,
        thumbnailUrl: 'https://picsum.photos/id/404/200/200',
        imageUrl: 'https://picsum.photos/id/404/600/800',
        creationDate: new Date('2024-10-20T19:40:20.771Z')
      },
      {
        id: '9e0b3ef4-cd99-44ac-8912-bd772b379d25',
        title: 'Trip to Singapore',
        description: 'A beautiful journey through the city of lights',
        price: 3757.72,
        rating: 3.8,
        nrOfRatings: 159,
        verticalType: 'car',
        tags: ['culture', 'food', 'history'],
        co2: 656.4,
        thumbnailUrl: 'https://picsum.photos/id/456/200/200',
        imageUrl: 'https://picsum.photos/id/456/600/800',
        creationDate: new Date('2024-10-20T19:40:20.776Z')
      },
      {
        id: 'd12fd2ee-7077-48eb-a98b-036c605c186b',
        title: 'Trip to Edinburgh',
        description: 'A beautiful journey through the eternal city',
        price: 1531.13,
        rating: 3.1,
        nrOfRatings: 921,
        verticalType: 'train',
        tags: ['culture', 'shopping', 'business'],
        co2: 760.6,
        thumbnailUrl: 'https://picsum.photos/id/559/200/200',
        imageUrl: 'https://picsum.photos/id/559/600/800',
        creationDate: new Date('2024-10-20T19:40:20.781Z')
      },
      {
        id: '48c019d7-afda-4dcd-8359-499cd5befb6f',
        title: 'Trip to Oslo',
        description: 'A beautiful journey through the big apple',
        price: 2517.32,
        rating: 3.1,
        nrOfRatings: 566,
        verticalType: 'car',
        tags: ['history', 'business', 'nature'],
        co2: 208.7,
        thumbnailUrl: 'https://picsum.photos/id/272/200/200',
        imageUrl: 'https://picsum.photos/id/272/600/800',
        creationDate: new Date('2024-10-20T19:40:20.786Z')
      },
      {
        id: '5062a516-44b7-4b4b-a3b1-9ec0d33cb685',
        title: 'Trip to London',
        description: 'A beautiful journey through the city of lights',
        price: 4069.02,
        rating: 4.6,
        nrOfRatings: 209,
        verticalType: 'train',
        tags: ['history', 'food'],
        co2: 834.7,
        thumbnailUrl: 'https://picsum.photos/id/544/200/200',
        imageUrl: 'https://picsum.photos/id/544/600/800',
        creationDate: new Date('2024-10-20T19:40:20.792Z')
      },
      {
        id: 'c70640be-5578-43ba-ad35-acd481841764',
        title: 'Trip to Hanoi',
        description: 'A beautiful journey through the eternal city',
        price: 2783.29,
        rating: 2.5,
        nrOfRatings: 897,
        verticalType: 'car',
        tags: ['shopping'],
        co2: 933.5,
        thumbnailUrl: 'https://picsum.photos/id/282/200/200',
        imageUrl: 'https://picsum.photos/id/282/600/800',
        creationDate: new Date('2024-10-20T19:40:20.799Z')
      },
      {
        id: 'd6fbf01e-5059-4ba2-b6c6-bc4baa3c4889',
        title: 'Trip to Madrid',
        description: 'A beautiful journey through the city of lights',
        price: 1643.78,
        rating: 1.8,
        nrOfRatings: 879,
        verticalType: 'flight',
        tags: ['nature'],
        co2: 83.3,
        thumbnailUrl: 'https://picsum.photos/id/701/200/200',
        imageUrl: 'https://picsum.photos/id/701/600/800',
        creationDate: new Date('2024-10-20T19:40:20.806Z')
      }
    ],
    total: 1011,
    page: 1,
    limit: 10
  };

  getTripScore(flight: Trip): TripScore {
    return calculateScore({ rating: flight.rating, nrOfRatings: flight.nrOfRatings, co2: flight.co2 });
  }
}
