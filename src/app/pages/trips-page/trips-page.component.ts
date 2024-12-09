import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from '@/components/form-input/form-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-trips-page',
  standalone: true,
  imports: [CommonModule, FormInputComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="formGroup">
      <app-form-input type="text" label="Hello" inputId="myId" formControlName="name"></app-form-input>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsPageComponent {
  testControl = new FormControl('MyDefaultValue', Validators.required);
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });
}
