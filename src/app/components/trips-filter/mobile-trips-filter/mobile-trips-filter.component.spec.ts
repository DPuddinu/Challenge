import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileTripsFilterComponent } from './mobile-trips-filter.component';

describe('FlightsFilterComponent', () => {
  let component: MobileTripsFilterComponent;
  let fixture: ComponentFixture<MobileTripsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileTripsFilterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileTripsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
