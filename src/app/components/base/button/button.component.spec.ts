import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply primary variant classes by default', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('bg-primary-500')).toBeTruthy();
    expect(button.classList.contains('text-primary-content')).toBeTruthy();
  });

  it('should apply secondary variant classes when specified', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('bg-secondary-500')).toBeTruthy();
    expect(button.classList.contains('text-secondary-content')).toBeTruthy();
  });

  it('should apply outline variant classes when specified', () => {
    fixture.componentRef.setInput('variant', 'outline');
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('border-primary-500')).toBeTruthy();
    expect(button.classList.contains('text-primary-500')).toBeTruthy();
  });

  it('should apply correct size classes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach(size => {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains(`h-${size === 'sm' ? '8' : size === 'md' ? '10' : '12'}`)).toBeTruthy();
    });
  });

  it('should set disabled attribute when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('should set correct button type', () => {
    const types = ['button', 'submit', 'reset'] as const;
    
    types.forEach(type => {
      fixture.componentRef.setInput('type', type);
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.type).toBe(type);
    });
  });
}); 