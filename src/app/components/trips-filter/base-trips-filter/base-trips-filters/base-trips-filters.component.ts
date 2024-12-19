import { ComboBoxComponent } from '@/components/base/combo-box/combo-box.component';
import { InputComponent } from '@/components/base/input/input.component';
import { SliderComponent } from '@/components/base/slider/slider.component';
import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-base-trips-filters',
  imports: [ReactiveFormsModule, InputComponent, ComboBoxComponent, SliderComponent],
  template: ` <form [formGroup]="searchForm">
      <app-input
        type="text"
        placeholder="Enter title"
        label="Title"
        inputId="title"
        formControlName="title"
      ></app-input>
    </form>
    <form [formGroup]="formGroup" class="py-4 flex flex-col gap-4" (ngSubmit)="onSubmit()">
      <app-input
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
      <app-slider label="Rating" formControlName="ratingRange" [min]="0" [max]="5" [step]="1"></app-slider>

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
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md" (click)="onSubmit()">Submit</button>
    </form>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseTripsFiltersComponent {
  searchForm = new FormGroup({
    title: new FormControl()
  });
  formGroup = new FormGroup({
    minPrice: new FormControl(),
    maxPrice: new FormControl(),
    ratingRange: new FormControl({
      min: 1,
      max: 3
    }),
    tags: new FormControl([]),
    page: new FormControl(1),
    limit: new FormControl(10)
  });

  titleChanges = toSignal(this.searchForm.valueChanges.pipe(debounceTime(300), distinctUntilChanged()));
  otherChanges = toSignal(this.formGroup.valueChanges);

  constructor() {
    effect(() => {
      console.log(this.titleChanges());
      console.log(this.otherChanges());
    });
  }
  onSubmit() {
    // console.log(this.formSignal());
    // TODO: Implement submit logic
  }
}
