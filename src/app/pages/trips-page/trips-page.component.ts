import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectComponent } from '@/components/select/select.component';
import { InputComponent } from '@/components/input/input.component';
import { ComboBoxComponent } from "../../components/combo-box/combo-box.component";

@Component({
  selector: 'app-trips-page',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule, SelectComponent, ComboBoxComponent],
  template: `
    <form [formGroup]="formGroup" class="py-4 flex flex-col gap-4" (ngSubmit)="onSubmit()">
      <app-input type="text" label="Hello" inputId="myId" formControlName="name"></app-input>
      <app-select
        [options]="[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }, { value: '3', label: 'Option 3' }]"
        label="Select"
        selectId="mySelect"
        formControlName="selectName"
        ></app-select>
        <app-combo-box 
          label="Tags"
          comboBoxId="myComboBox"
          formControlName="tags"
          [customErrorMessages]="{
            'required': 'Please add at least one tag',
            'minlength': 'Please add at least 2 tags',
            'maxlength': 'Please add at most 4 tags'
          }"
        ></app-combo-box>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md" (click)="onSubmit()">Submit</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsPageComponent {
  testControl = new FormControl('MyDefaultValue', Validators.required);
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    selectName: new FormControl('', Validators.required),
    tags: new FormControl([], [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(4)
    ])
  });

  onSubmit() {
    if(this.formGroup.valid){

    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
