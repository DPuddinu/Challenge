import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [NgTemplateOutlet],
  template: `
    <div class="p-4 rounded bg-secondary-600 hover:cursor-pointer hover:bg-secondary-500 transition-colors duration-200 hover:shadow shadow-secondary-700 @container grid group">
      <ng-container *ngTemplateOutlet="cardContent || defaultCardTemplate; context: { $implicit: data }"></ng-container>
    </div>

    <ng-template #defaultCardTemplate let-data>
      <h4 class="text-lg font-semibold">{{ data.title }}</h4>
      <p class="text-sm text-gray-500">{{ data.description }}</p>
    </ng-template>
  `
})
export class CardComponent<T> {
  @ContentChild('cardContent') cardContent: TemplateRef<T> | undefined;
  data = input<T>();
}
