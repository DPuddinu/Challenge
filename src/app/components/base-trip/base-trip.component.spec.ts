import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseTripComponent } from './base-trip.component';

describe('BaseTripComponent', () => {
  let component: BaseTripComponent;
  let fixture: ComponentFixture<BaseTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseTripComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
