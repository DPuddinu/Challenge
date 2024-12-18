import { ComboBoxComponent } from '@/components/base/combo-box/combo-box.component';
import { InputComponent } from '@/components/base/input/input.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-base-trips-filters',
  imports: [ReactiveFormsModule, InputComponent, ComboBoxComponent],
  template: `
  <form [formGroup]="formGroup" class="py-4 flex flex-col gap-4" (ngSubmit)="onSubmit()">
    <app-input type="text" placeholder="Enter title" label="Title" inputId="myId" formControlName="title"></app-input>
    <app-input
      type="number"
      placeholder="Enter min price"
      label="Min Price"
      inputId="myId"
      formControlName="minPrice"
    ></app-input>
    <app-input
      type="number"
      placeholder="Enter max price"
      label="Max Price"
      inputId="myId"
      formControlName="maxPrice"
    ></app-input>
    <app-input
      type="number"
      placeholder="Enter min rating"
      label="Min Rating"
      inputId="myId"
      formControlName="minRating"
    ></app-input>
    <app-input
      type="number"
      placeholder="Enter max rating"
      label="Max Rating"
      inputId="myId"
      formControlName="maxRating"
    ></app-input>

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
  formGroup = new FormGroup({
    title: new FormControl(),
    minPrice: new FormControl(),
    maxPrice: new FormControl(),
    minRating: new FormControl(),
    maxRating: new FormControl(),
    tags: new FormControl([]),
    page: new FormControl(1),
    limit: new FormControl(10)
  });

  onSubmit() {
    // TODO: Implement submit logic
  }
}
