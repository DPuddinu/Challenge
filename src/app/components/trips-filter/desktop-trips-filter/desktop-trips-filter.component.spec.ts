import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesktopTripsFilterComponent } from './desktop-trips-filter.component';

describe('DesktopTripsFilterComponent', () => {
  let component: DesktopTripsFilterComponent;
  let fixture: ComponentFixture<DesktopTripsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopTripsFilterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopTripsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
