import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectComponent } from '@/components/select/select.component';
import { InputComponent } from '@/components/input/input.component';
import { TagComponent } from '@/components/tag/tag.component';

@Component({
  selector: 'app-trips-page',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule, SelectComponent, TagComponent],
  template: `
    <form [formGroup]="formGroup" class="py-4 flex flex-col gap-4">
      <app-input type="text" label="Hello" inputId="myId" formControlName="name"></app-input>
      <app-select
        [options]="[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }, { value: '3', label: 'Option 3' }]"
        label="Select"
        selectId="mySelect"
        formControlName="selectName"
      ></app-select>
      <app-tag label="Tag 1" id="1"></app-tag>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsPageComponent {
  testControl = new FormControl('MyDefaultValue', Validators.required);
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    selectName: new FormControl('', Validators.required)
  });
}
