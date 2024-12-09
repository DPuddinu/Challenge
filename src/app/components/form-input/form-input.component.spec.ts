import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormInputComponent } from './form-input.component';

describe('FormInputComponent', () => {
  let component: FormInputComponent<'text'>;
  let fixture: ComponentFixture<FormInputComponent<'text'>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormInputComponent<'text'>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
