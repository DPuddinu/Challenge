import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Trip } from '@/models/trip.types';

describe('CardComponent', () => {
  let component: CardComponent<Trip>;
  let fixture: ComponentFixture<CardComponent<Trip>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent<Trip>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
