import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationErrorsComponent } from './validation-errors.component';

describe('ValidationErrorsComponent', () => {
  let component: ValidationErrorsComponent;
  let fixture: ComponentFixture<ValidationErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationErrorsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidationErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no errors when errors input is null', () => {
    fixture.componentRef.setInput('errors', null);
    fixture.detectChanges();
    
    const errorElements = fixture.nativeElement.querySelectorAll('li');
    expect(errorElements.length).toBe(0);
  });

  it('should display validation errors with default messages', () => {
    fixture.componentRef.setInput('errors', {
      required: true,
      minlength: { requiredLength: 3, actualLength: 1 }
    });
    fixture.detectChanges();
    
    const errorElements = fixture.nativeElement.querySelectorAll('li');
    expect(errorElements.length).toBe(2);
    expect(errorElements[0].textContent).toContain('Invalid: required');
    expect(errorElements[1].textContent).toContain('Invalid: minlength');
  });

  it('should display custom error messages when provided', () => {
    fixture.componentRef.setInput('errors', {
      required: true,
      minlength: { requiredLength: 3, actualLength: 1 }
    });
    fixture.componentRef.setInput('customErrorMessages', {
      required: 'This field is required',
      minlength: 'Minimum length not met'
    });
    fixture.detectChanges();
    
    const errorElements = fixture.nativeElement.querySelectorAll('li');
    expect(errorElements.length).toBe(2);
    expect(errorElements[0].textContent).toContain('This field is required');
    expect(errorElements[1].textContent).toContain('Minimum length not met');
  });

  it('should update error messages when errors input changes', () => {
    fixture.componentRef.setInput('errors', { required: true });
    fixture.detectChanges();
    
    let errorElements = fixture.nativeElement.querySelectorAll('li');
    expect(errorElements.length).toBe(1);

    fixture.componentRef.setInput('errors', { required: true, email: true });
    fixture.detectChanges();
    
    errorElements = fixture.nativeElement.querySelectorAll('li');
    expect(errorElements.length).toBe(2);
  });
});
