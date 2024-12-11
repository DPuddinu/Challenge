import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectComponent } from '@/components/select/select.component';
import { InputComponent } from '@/components/input/input.component';

@Component({
  selector: 'app-trips-page',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule, SelectComponent],
  template: `
    <form [formGroup]="formGroup" class="py-4 flex flex-col gap-4">
      <app-input type="text" label="Hello" inputId="myId" formControlName="name"></app-input>
      <app-select
        [options]="['Option 1', 'Option 2', 'Option 3']"
        label="Select"
        selectId="mySelect"
        formControlName="selectName"
      ></app-select>
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
