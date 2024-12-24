import { InputComponent } from '@/components/base/input/input.component';
import { SelectComponent } from '@/components/base/select/select.component';
import { FlightFilterFields, flightSortByFields } from '@/models/trip.types';
import { TripsService } from '@/services/trips-service/trips.service';
import { filterObject } from '@/utils/filterObject';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, map } from 'rxjs';

// type TFormValues = {
//   ratingRange: {
//     min: number;
//     max: number;
//   };
//   tags: string[];
//   minPrice: number;
//   maxPrice: number;
// };

@Component({
  selector: 'app-base-trips-filters',
  imports: [ReactiveFormsModule, InputComponent, SelectComponent],
  template: `
    <app-input type="text" placeholder="Enter title" label="Title" id="title" [formControl]="titleFilter"></app-input>
    <form [formGroup]="formGroup" class="py-4 flex flex-col gap-4">
      <app-select [options]="sortByOptions" label="Sort By" formControlName="sortBy"></app-select>
      <app-select [options]="sortOrderOptions" label="Sort Order" formControlName="sortOrder"></app-select>
      <!-- <app-input
        type="number"
        placeholder="Enter min price"
        label="Min Price"
        id="minPrice"
        formControlName="minPrice"
      ></app-input>
      <app-input
        type="number"
        placeholder="Enter max price"
        label="Max Price"
        id="maxPrice"
        formControlName="maxPrice"
      ></app-input>
      <app-input
        type="number"
        placeholder="Enter min rating"
        label="Min Rating"
        id="minRating"
        formControlName="minRating"
      ></app-input>
      <app-slider label="Rating" formControlName="ratingRange" [min]="1" [max]="5" [step]="1"></app-slider>

      <app-combo-box
        label="Tags"
        comboBoxId="myComboBox"
        formControlName="tags"
        [customErrorMessages]="{
          required: 'Please add at least one tag',
          minlength: 'Please add at least 2 tags',
          maxlength: 'Please add at most 4 tags'
        }"
      ></app-combo-box>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md" (click)="onSubmit()">Submit</button> -->
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
    sortOrder: new FormControl('ASC')
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
          const validValues = filterObject(values);
          return Object.keys(validValues).length > 0 ? validValues : undefined;
        }),
        filter(values => !!values),
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
