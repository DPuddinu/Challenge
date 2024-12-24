import { InputComponent } from '@/components/base/input/input.component';
import { SelectComponent } from '@/components/base/select/select.component';
import { FlightFilterFields, flightSortByFields } from '@/models/trip.types';
import { TripsService } from '@/services/trips-service/trips.service';
import { filterObject } from '@/utils/filterObject';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { SliderComponent } from "../base/slider/slider.component";

@Component({
  selector: 'app-base-trips-filters',
  imports: [ReactiveFormsModule, InputComponent, SelectComponent, SliderComponent],
  template: `
    <app-input type="text" placeholder="Enter title" label="Title" id="title" [formControl]="titleFilter"></app-input>
    <form [formGroup]="formGroup" class="py-4 flex flex-col gap-4">
      <app-select [options]="sortByOptions" label="Sort By" formControlName="sortBy"></app-select>
      <app-select [options]="sortOrderOptions" label="Sort Order" formControlName="sortOrder"></app-select>
      <app-input
        type="number"
        placeholder="Enter min rating"
        label="Min Rating"
        id="minRating"
        formControlName="minRating"
      ></app-input>
      <app-slider label="Price Range" formControlName="priceRange" [min]="1" [max]="10000" [step]="10"></app-slider>

      <!-- <app-combo-box
        label="Tags"
        comboBoxId="myComboBox"
        formControlName="tags"
        
      ></app-combo-box> -->
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md" (click)="clearFilters()">
        Clear Filters
      </button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseTripsFiltersComponent {
  titleFilter = new FormControl();
  formGroup = new FormGroup({
    sortBy: new FormControl('creationDate'),
    sortOrder: new FormControl('ASC'),
    priceRange: new FormControl({ min: 1, max: 10000 }),
    minRating: new FormControl(1)
  });

  sortByOptions = flightSortByFields.map(field => ({ value: field, label: field }));
  sortOrderOptions = ['ASC', 'DESC'].map(order => ({ value: order, label: order }));

  constructor(private tripsService: TripsService) {
    this.titleFilter.valueChanges
      .pipe(
        filter(title => !!title),
        debounceTime(300),
        takeUntilDestroyed()
      )
      .subscribe(title => {
        this.tripsService.setQueryParam('titleFilter', title);
      });
    this.formGroup.valueChanges
      .pipe(
        map(values => {
          const filters = {
            sortBy: values.sortBy,
            sortOrder: values.sortOrder,
            minRating: values.minRating,
            minPrice: values.priceRange?.min,
            maxPrice: values.priceRange?.max
          }
          const validValues = filterObject(filters);
          return Object.keys(validValues).length > 0 ? validValues : undefined;
        }),
        filter(values => !!values),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe((values: Partial<FlightFilterFields>) => {
        this.tripsService.setQueryParams(values);
      });

    const storedParams = this.tripsService.getStoredQueryParams();
    if (storedParams) {
      this.titleFilter.setValue(storedParams['titleFilter'], { emitEvent: false });
      this.formGroup.patchValue(storedParams, { emitEvent: false });
    }
  }

  clearFilters() {
    this.titleFilter.reset();
    this.formGroup.reset({
      sortBy: 'creationDate',
      sortOrder: 'ASC'
    });
    this.tripsService.reset();
  }
}
