import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripsPageComponent } from './trips-page.component';

describe('TripsPageComponent', () => {
  let component: TripsPageComponent;
  let fixture: ComponentFixture<TripsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripsPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TripsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
