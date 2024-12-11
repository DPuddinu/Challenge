import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormInputComponent', () => {
  let component: InputComponent<'text'>;
  let fixture: ComponentFixture<InputComponent<'text'>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent<'text'>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('type', 'text');
    fixture.detectChanges();
  });

  it('should create text input', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
