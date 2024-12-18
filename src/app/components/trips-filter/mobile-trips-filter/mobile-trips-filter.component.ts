import { ButtonComponent } from '@/components/base/button/button.component';
import { ComboBoxComponent } from '@/components/base/combo-box/combo-box.component';
import { InputComponent } from '@/components/base/input/input.component';
import { MobileDialogComponent } from '@/components/base/mobile-dialog/mobile-dialog.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseTripsFiltersComponent } from '../base-trips-filter/base-trips-filters/base-trips-filters.component';

@Component({
  selector: 'app-flights-filter-mobile',
  imports: [
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
    ComboBoxComponent,
    MobileDialogComponent,
    ButtonComponent
  ],
  template: `
  <div>
    <app-button (click)="dialog.open()">Filters</app-button>
    <app-mobile-dialog title="Filters" #dialog="mobileDialog">
      
    </app-mobile-dialog>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileTripsFilterComponent extends BaseTripsFiltersComponent {}
