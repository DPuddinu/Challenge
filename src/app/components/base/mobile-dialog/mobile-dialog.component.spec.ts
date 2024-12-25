import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileDialogComponent } from './mobile-dialog.component';
import { ComponentRef } from '@angular/core';

describe('MobileDialogComponent', () => {
  let component: MobileDialogComponent;
  let componentRef: ComponentRef<MobileDialogComponent>;
  let fixture: ComponentFixture<MobileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileDialogComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
