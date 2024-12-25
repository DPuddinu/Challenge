import { TripsService } from '@/services/trips-service/trips.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseTripsFiltersComponent } from './base-trips-filters.component';

describe('BaseTripsFiltersComponent', () => {
  let component: BaseTripsFiltersComponent;
  let fixture: ComponentFixture<BaseTripsFiltersComponent>;
  let tripsServiceMock: Partial<TripsService>;

  beforeEach(async () => {
    tripsServiceMock = {
      setQueryParam: jasmine.createSpy('setQueryParam'),
      setQueryParams: jasmine.createSpy('setQueryParams'),
      reset: jasmine.createSpy('reset'),
      getStoredQueryParams: jasmine
        .createSpy('getStoredQueryParams')
        .and.returnValue({ titleFilter: 'Test', sortBy: 'creationDate' })
    };

    await TestBed.configureTestingModule({
      imports: [BaseTripsFiltersComponent, ReactiveFormsModule], // Standalone component
      providers: [{ provide: TripsService, useValue: tripsServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTripsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Ensure the component is properly destroyed after each test
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
