import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { InputComponent } from '../input/input.component';
import { MobileDialogComponent } from '../mobile-dialog/mobile-dialog.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-flights-filter',
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    ComboBoxComponent,
    MobileDialogComponent,
    ButtonComponent
  ],
  template: ` <div>
    <app-button (click)="dialog.open()">Open dialog</app-button>
    <app-mobile-dialog title="Filters" #dialog="mobileDialog">
      <form [formGroup]="formGroup" class="py-4 flex flex-col gap-4" (ngSubmit)="onSubmit()">
        <app-input
          type="text"
          placeholder="Enter title"
          label="Title"
          inputId="myId"
          formControlName="title"
        ></app-input>
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
      </form>
    </app-mobile-dialog>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightsFilterComponent {
  formGroup = new FormGroup({
    title: new FormControl(),
    minPrice: new FormControl(),
    maxPrice: new FormControl(),
    minRating: new FormControl(),
    maxRating: new FormControl(),
    tags: new FormControl([])
  });

  onSubmit() {
    if (this.formGroup.valid) {
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
