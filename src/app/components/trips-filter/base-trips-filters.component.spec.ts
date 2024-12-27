import { INITIAL_QUERY_PARAMS, TripsService } from '@/services/trips-service/trips.service';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseTripsFiltersComponent } from './base-trips-filters.component';

describe('BaseTripsFiltersComponent', () => {
  let component: BaseTripsFiltersComponent;
  let fixture: ComponentFixture<BaseTripsFiltersComponent>;
  let tripsServiceMock: jasmine.SpyObj<TripsService>;

  beforeEach(async () => {
    tripsServiceMock = jasmine.createSpyObj('TripsService', ['setQueryParams', 'reset', 'getStoredQueryParams']);
    tripsServiceMock.getStoredQueryParams.and.returnValue(undefined); // Mocking stored params

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BaseTripsFiltersComponent],
      providers: [{ provide: TripsService, useValue: tripsServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTripsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.formGroup.value).toEqual({
      titleFilter: null,
      sortBy: INITIAL_QUERY_PARAMS.sortBy,
      sortOrder: INITIAL_QUERY_PARAMS.sortOrder,
      priceRange: { min: INITIAL_QUERY_PARAMS.minPrice, max: INITIAL_QUERY_PARAMS.maxPrice },
      minRating: INITIAL_QUERY_PARAMS.minRating
    });
  });

  it('should call setQueryParams on value changes when form is dirty and touched', fakeAsync(() => {
    // Mark the form as dirty and touched
    component.formGroup.markAsDirty();
    component.formGroup.markAsTouched();

    // Patch form values
    component.formGroup.patchValue({
      titleFilter: 'Test Trip',
      sortBy: 'price',
      sortOrder: 'ASC',
      minRating: 4,
      priceRange: { min: 100, max: 5000 }
    });

    // Use tick to handle debounceTime
    tick(300);

    // Verify the service was called with filtered values
    expect(tripsServiceMock.setQueryParams).toHaveBeenCalledWith({
      titleFilter: 'Test Trip',
      sortBy: 'price',
      sortOrder: 'ASC',
      minRating: 4,
      minPrice: 100,
      maxPrice: 5000
    });
  }));

  it('should not call setQueryParams when form is pristine', fakeAsync(() => {
    // Form is pristine by default
    component.formGroup.patchValue({
      titleFilter: 'Test Trip'
    });

    tick(300);

    expect(tripsServiceMock.setQueryParams).not.toHaveBeenCalled();
  }));

  it('should not call setQueryParams when form is untouched', fakeAsync(() => {
    component.formGroup.markAsDirty();
    // Form remains untouched
    component.formGroup.patchValue({
      titleFilter: 'Test Trip'
    });

    tick(300);

    expect(tripsServiceMock.setQueryParams).not.toHaveBeenCalled();
  }));

  it('should filter out undefined values before calling setQueryParams', fakeAsync(() => {
    component.formGroup.markAsDirty();
    component.formGroup.markAsTouched();

    component.formGroup.patchValue({
      titleFilter: 'Test Trip',
      sortBy: undefined,
      sortOrder: undefined,
      minRating: undefined,
      priceRange: undefined
    });

    tick(300);

    expect(tripsServiceMock.setQueryParams).toHaveBeenCalledWith({
      titleFilter: 'Test Trip'
    });
  }));

  it('should reset the form on clearFilters', () => {
    component.clearFilters();
    expect(component.formGroup.value).toEqual({
      titleFilter: null,
      sortBy: INITIAL_QUERY_PARAMS.sortBy,
      sortOrder: INITIAL_QUERY_PARAMS.sortOrder,
      priceRange: { min: INITIAL_QUERY_PARAMS.minPrice, max: INITIAL_QUERY_PARAMS.maxPrice },
      minRating: INITIAL_QUERY_PARAMS.minRating
    });
    expect(tripsServiceMock.reset).toHaveBeenCalled();
  });
});
