import { TripsService } from '@/services/trips-service/trips.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      imports: [ReactiveFormsModule],
      declarations: [BaseTripsFiltersComponent],
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
      sortBy: 'creationDate',
      sortOrder: 'ASC',
      priceRange: { min: 1, max: 10000 },
      minRating: null
    });
  });

  it('should call setQueryParams on value changes', () => {
    component.formGroup.patchValue({ titleFilter: 'Test' });
    expect(tripsServiceMock.setQueryParams).toHaveBeenCalled();
  });

  it('should reset the form on clearFilters', () => {
    component.clearFilters();
    expect(component.formGroup.value).toEqual({
      titleFilter: null,
      sortBy: 'creationDate',
      sortOrder: 'ASC',
      priceRange: { min: 1, max: 10000 },
      minRating: null
    });
    expect(tripsServiceMock.reset).toHaveBeenCalled();
  });
});
