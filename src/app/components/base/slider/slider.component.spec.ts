import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from './slider.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

// Test host component to test form integration
@Component({
  standalone: true,
  imports: [SliderComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <app-slider
        formControlName="range"
        [min]="0"
        [max]="100"
        [step]="1"
        label="Test Slider"
      ></app-slider>
    </form>
  `
})
class TestHostComponent {
  form = new FormGroup({
    range: new FormControl({ min: 0, max: 100 })
  });
}

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    
    // Set required inputs
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with form controls', () => {
    expect(component.formGroup).toBeTruthy();
    expect(component.minControl).toBeTruthy();
    expect(component.maxControl).toBeTruthy();
  });

  it('should display label when provided', () => {
    fixture.componentRef.setInput('label', 'Price Range');
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('app-label');
    expect(labelElement).toBeTruthy();
    expect(labelElement.getAttribute('ng-reflect-text')).toBe('Price Range');
  });

  it('should set min and max values on range inputs', () => {
    const [minInput, maxInput] = fixture.nativeElement.querySelectorAll('input[type="range"]');
    
    expect(minInput.min).toBe('0');
    expect(minInput.max).toBe('100');
    expect(maxInput.min).toBe('0');
    expect(maxInput.max).toBe('100');
  });

  it('should update max value when min value exceeds it', () => {
    component.formGroup?.get('min')?.setValue(80);
    component.formGroup?.get('max')?.setValue(60);
    fixture.detectChanges();

    expect(component.formGroup?.get('max')?.value).toBe(80);
  });

  it('should update min value when max value is less than it', () => {
    component.formGroup?.get('min')?.setValue(60);
    component.formGroup?.get('max')?.setValue(40);
    fixture.detectChanges();

    expect(component.formGroup?.get('min')?.value).toBe(40);
  });

  it('should apply custom error messages when provided', () => {
    fixture.componentRef.setInput('customErrorMessages', {
      required: 'Custom required message'
    });
    component.formGroup?.setErrors({ required: true });
    component.formGroup?.markAsTouched();
    component.formGroup?.markAsDirty();
    fixture.detectChanges();

    const validationErrors = fixture.nativeElement.querySelector('app-validation-errors');
    expect(validationErrors.getAttribute('ng-reflect-custom-error-messages')).toBeTruthy();
  });
});

describe('SliderComponent Form Integration', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderComponent, TestHostComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should integrate with reactive forms', () => {
    expect(component.form.get('range')).toBeTruthy();
  });

  it('should update form value when range changes', () => {
    const newValue = { min: 20, max: 80 };
    component.form.get('range')?.setValue(newValue);
    fixture.detectChanges();

    expect(component.form.get('range')?.value).toEqual(newValue);
  });
});
