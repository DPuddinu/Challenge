import { InputComponent } from '@/components/base/input/input.component';
import { SelectComponent } from '@/components/base/select/select.component';
import { FlightFilterFields, flightSortByFields } from '@/models/trip.types';
import { TripsService } from '@/services/trips-service/trips.service';
import { filterObject } from '@/utils/filterObject';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, map } from 'rxjs';
import { SliderComponent } from '../base/slider/slider.component';
import { INITIAL_QUERY_PARAMS } from '@/services/trips-service/trips.constants';

@Component({
  selector: 'app-base-trips-filters',
  imports: [ReactiveFormsModule, InputComponent, SelectComponent, SliderComponent],
  template: `
    <form [formGroup]="formGroup" class="py-4 flex flex-col gap-4">
      <app-input
        type="text"
        i18n-placeholder="@@input.placeholder.title"
        placeholder="Enter title"
        i18n-label="@@input.label.title"
        label="Title"
        id="title"
        formControlName="titleFilter"
      ></app-input>
      <app-select 
        [options]="sortByOptions" 
        i18n-label="@@input.label.sortBy"
        label="Sort By" 
        formControlName="sortBy"
      ></app-select>
      <app-select 
        [options]="sortOrderOptions" 
        i18n-label="@@input.label.sortOrder"
        label="Sort Order" 
        formControlName="sortOrder"
      ></app-select>
      <app-input
        type="number"
        i18n-placeholder="@@input.placeholder.minRating"
        placeholder="Enter min rating"
        i18n-label="@@input.label.minRating"
        label="Min Rating"
        id="minRating"
        formControlName="minRating"
      ></app-input>
      <app-slider 
        i18n-label="@@input.label.priceRange"
        label="Price Range" 
        formControlName="priceRange" 
        [min]="1" 
        [max]="10000" 
        [step]="10"
      ></app-slider>

      <!-- <app-combo-box
        i18n-label="@@input.label.tags"
        label="Tags"
        comboBoxId="myComboBox"
        formControlName="tags"
      ></app-combo-box> -->
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md" (click)="clearFilters()" i18n>
        Clear Filters
      </button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseTripsFiltersComponent {
  formGroup = new FormGroup({
    titleFilter: new FormControl(),
    sortBy: new FormControl(INITIAL_QUERY_PARAMS.sortBy),
    sortOrder: new FormControl(INITIAL_QUERY_PARAMS.sortOrder),
    priceRange: new FormControl({ min: INITIAL_QUERY_PARAMS.minPrice, max: INITIAL_QUERY_PARAMS.maxPrice }),
    minRating: new FormControl(INITIAL_QUERY_PARAMS.minRating)
  });

  sortByOptions = flightSortByFields.map(field => ({ value: field, label: field }));
  sortOrderOptions = ['ASC', 'DESC'].map(order => ({ value: order, label: order }));

  constructor(private tripsService: TripsService) {
    this.formGroup.valueChanges
      .pipe(
        filter(() => this.formGroup.dirty && this.formGroup.touched),
        map(values => {
          const filters = {
            sortBy: values.sortBy,
            sortOrder: values.sortOrder,
            minRating: values.minRating,
            minPrice: values.priceRange?.min,
            maxPrice: values.priceRange?.max,
            titleFilter: values.titleFilter
          };
          const validValues = filterObject(filters);
          return Object.keys(validValues).length > 0 ? validValues : undefined;
        }),
        filter(values => !!values),
        debounceTime(300),
        takeUntilDestroyed()
      )
      .subscribe((values: Partial<FlightFilterFields>) => {
        this.tripsService.setQueryParams(values);
      });

    const storedParams = this.tripsService.getStoredQueryParams();
    if (storedParams) {
      this.formGroup.patchValue(storedParams, { emitEvent: false });
    }
  }

  clearFilters() {
    this.formGroup.reset({
      sortBy: INITIAL_QUERY_PARAMS.sortBy,
      sortOrder: INITIAL_QUERY_PARAMS.sortOrder,
      minRating: INITIAL_QUERY_PARAMS.minRating,
      priceRange: {
        min: INITIAL_QUERY_PARAMS.minPrice,
        max: INITIAL_QUERY_PARAMS.maxPrice
      }
    });
    this.tripsService.reset();
  }
}
