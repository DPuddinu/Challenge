import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseTripsFiltersComponent } from './base-trips-filters.component';

describe('BaseTripsFiltersComponent', () => {
  let component: BaseTripsFiltersComponent;
  let fixture: ComponentFixture<BaseTripsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseTripsFiltersComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTripsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
