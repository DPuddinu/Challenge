import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResolverResponse } from 'resolvers/trip-detail.resolver';
import { map } from 'rxjs';
import { IconComponent } from '@/components/base/icon/icon.component';
import { ParenthesisPipe } from '@/pipes/parenthesis.pipe';
import { TagComponent } from '@/components/base/tag/tag.component';
import { WeightUnitPipe } from '@/pipes/weight-unit.pipe';
import { BaseTripComponent } from '@/components/base-trip/base-trip.component';

@Component({
  selector: 'app-trips-detail',
  imports: [CommonModule, NgOptimizedImage, IconComponent, ParenthesisPipe, TagComponent, WeightUnitPipe],
  template: `
    <section class="container mx-auto py-4 ">
      @if (trip$ | async; as trip) {
        @switch (trip.status) {
          @case ('success') {
            <div class="w-full grid grid-rows-[40vh_1fr] h-full gap-2 bg-secondary-800 rounded-lg">
              <header class="relative overflow-hidden">
                <img
                  [ngSrc]="trip.data.imageUrl"
                  alt="trip image"
                  fill
                  priority
                  class="object-cover rounded-t-lg"
                  placeholder="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO89x8AAsEB3+IGkhwAAAAASUVORK5CYII="
                />
              </header>
              <main class="bg-secondary-800 rounded-b-lg p-4">
                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <h1 class="~text-xl/3xl font-semibold text-secondary-content">{{ trip.data.title | titlecase }}</h1>
                    <h2 class="~text-2xl/4xl font-semibold text-secondary-content opacity-85">
                      {{ trip.data.price | currency }}
                    </h2>
                  </div>
                  <div class="flex gap-2 items-center text-secondary-content opacity-85">
                    <app-icon [name]="trip.data.verticalType" fill="none" [size]="24" [strokeWidth]="2" />
                    <span class="~text-lg/2xl">{{ trip.data.verticalType | titlecase }}</span>
                  </div>
                  <div>
                    <div class="flex items-center gap-2 text-secondary-content py-2">
                      <app-icon
                        class="text-"
                        [name]="'star'"
                        fill="currentColor"
                        [size]="24"
                        [strokeWidth]="2"
                        class="text-yellow-500"
                      />
                      <span class="~text-lg/2xl font-semibold">{{ trip.data.rating }}</span>
                      <span class="~text-lg/xl opacity-85">{{ trip.data.nrOfRatings | parenthesis }} </span>
                    </div>
                    <p class="~text-base/lg text-secondary-content opacity-85">{{ trip.data.description }}</p>
                  </div>

                  <div class="flex flex-wrap gap-2 py-2">
                    @for (tag of trip.data.tags; track tag) {
                      <app-tag [label]="tag" class="!bg-primary-500 w-fit"></app-tag>
                    }
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="flex gap-2 items-center">
                      <app-icon [name]="'leaf'" fill="none" [size]="24" [strokeWidth]="2" class="text-green-500" />
                      <span class="~text-base/lg text-secondary-content opacity-85"
                        >CO2 emissions: {{ trip.data.co2 | weightUnit }}</span
                      >
                    </div>
                    <ng-container
                      *ngTemplateOutlet="tierTemplate; context: { $implicit: getTripScore(trip.data).tier }"
                    ></ng-container>
                    <ng-template #tierTemplate let-tier>
                      <div class="flex gap-2  ~text-base/lg text-secondary-content opacity-85">
                        <span >Trip score: {{
                          tier.label | titlecase
                        }}</span>
                        <app-icon [class]="tier.color" [name]="'crown'" fill="none" [size]="24" [strokeWidth]="2" />
                      </div>
                    </ng-template>
                  </div>
                </div>
              </main>
            </div>
          }
          @case ('error') {
            <div>error...</div>
          }
        }
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsDetailComponent extends BaseTripComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  trip$ = this.activatedRoute.data.pipe(map((data): ResolverResponse => data['trip']));
}
