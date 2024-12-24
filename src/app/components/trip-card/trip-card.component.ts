import { Trip } from '@/models/trip.types';
import { CommonModule, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BaseTripComponent } from '../base-trip/base-trip.component';
import { IconComponent } from '../base/icon/icon.component';
import { TagComponent } from '../base/tag/tag.component';
import { CardComponent } from '../card/card.component';
import { FallbackImageDirective } from '@/directives/image-error-fallback.directive';

@Component({
  selector: 'app-trip-card',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    NgOptimizedImage,
    TagComponent,
    IconComponent,
    NgTemplateOutlet,
    RouterLink,
    FallbackImageDirective
  ],
  template: ` <app-card>
    <ng-template #cardContent>
      <a [routerLink]="['/trips', trip().id]">
        <div class="grid @sm:grid-cols-[max(30%,_200px)_1fr] @sm:items-center gap-4">
          <div class="overflow-hidden rounded-lg aspect-square relative">
            <img
              [ngSrc]="trip().thumbnailUrl"
              [fallbackSrc]="'assets/placeholders/img-placeholder.svg'"
              fill
              priority
              class="rounded-lg object-contain transition-all duration-300 group-hover:scale-110"
              placeholder="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO89x8AAsEB3+IGkhwAAAAASUVORK5CYII="
            />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between gap-2">
              <h4 class="~text-lg/2xl font-semibold w-fit ">{{ trip().title }}</h4>
              <ng-container
                *ngTemplateOutlet="tierTemplate; context: { $implicit: getTripScore(trip()).tier }"
              ></ng-container>
              <ng-template #tierTemplate let-tier>
                <app-icon [class]="tier.color" [name]="'crown'" fill="none" [size]="24" [strokeWidth]="2" />
              </ng-template>
            </div>
            <div class="flex gap-2 items-center">
              <span class="~text-sm/base">{{ trip().verticalType | titlecase }}</span>
              <app-icon [name]="trip().verticalType" fill="none" [size]="16" [strokeWidth]="2" />
            </div>
            <div class="flex justify-between py-2">
              <span class="~text-base/2xl font-semibold">{{ trip().price | currency: 'EUR' }}</span>
            </div>
            <div class="flex flex-wrap gap-2">
              @for (tag of trip().tags; track tag) {
                <app-tag [label]="tag" class="!bg-primary-500 w-fit"></app-tag>
              }
            </div>
          </div>
        </div>
      </a>
    </ng-template>
  </app-card>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripCardComponent extends BaseTripComponent {
  trip = input.required<Trip>();
}
