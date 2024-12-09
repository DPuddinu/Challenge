import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormInputComponent } from './form-input.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormInputComponent', () => {
  let component: FormInputComponent<'text'>;
  let fixture: ComponentFixture<FormInputComponent<'text'>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormInputComponent<'text'>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('type', 'text');
    fixture.detectChanges();
  });

  it('should create text input', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
