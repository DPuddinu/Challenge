import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { PaginationButtonComponent } from './pagination-button.component';
import { By } from '@angular/platform-browser';
import '@angular/localize/init';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent, PaginationButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    
    // Set default input values
    fixture.componentRef.setInput('maxPages', 5);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalPages', 10);
    
    fixture.detectChanges();
  });

  const getButtonByTestId = (testId: string) => 
    fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));

  const getAllPageButtons = () => 
    fixture.debugElement.queryAll(By.css('[data-testid="page-button"]'));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation buttons with correct states', () => {
    // First page - previous/first buttons should be disabled
    fixture.componentRef.setInput('currentPage', 1);
    fixture.detectChanges();
    
    expect(getButtonByTestId('first-button').nativeElement.disabled).toBeTrue();
    expect(getButtonByTestId('previous-button').nativeElement.disabled).toBeTrue();
    expect(getButtonByTestId('next-button').nativeElement.disabled).toBeFalse();
    expect(getButtonByTestId('last-button').nativeElement.disabled).toBeFalse();

    // Last page - next/last buttons should be disabled
    fixture.componentRef.setInput('currentPage', 10);
    fixture.detectChanges();

    expect(getButtonByTestId('first-button').nativeElement.disabled).toBeFalse();
    expect(getButtonByTestId('previous-button').nativeElement.disabled).toBeFalse();
    expect(getButtonByTestId('next-button').nativeElement.disabled).toBeTrue();
    expect(getButtonByTestId('last-button').nativeElement.disabled).toBeTrue();
  });

  it('should emit correct page numbers when navigation buttons are clicked', () => {
    const pageChangeSpy = jasmine.createSpy('pageChange');
    component.pageChange.subscribe(pageChangeSpy);
    fixture.componentRef.setInput('currentPage', 5);
    fixture.detectChanges();

    getButtonByTestId('first-button').nativeElement.click();
    expect(pageChangeSpy).toHaveBeenCalledWith(1);

    getButtonByTestId('previous-button').nativeElement.click();
    expect(pageChangeSpy).toHaveBeenCalledWith(4);

    getButtonByTestId('next-button').nativeElement.click();
    expect(pageChangeSpy).toHaveBeenCalledWith(6);

    getButtonByTestId('last-button').nativeElement.click();
    expect(pageChangeSpy).toHaveBeenCalledWith(10);
  });

  it('should render correct page numbers with ellipsis', () => {
    fixture.componentRef.setInput('maxPages', 5);
    fixture.componentRef.setInput('currentPage', 5);
    fixture.componentRef.setInput('totalPages', 10);
    fixture.detectChanges();

    const pageButtons = getAllPageButtons();
    const pageLabels = pageButtons.map(btn => btn.nativeElement.textContent.trim());
    
    expect(pageLabels).toEqual([
      '1',
      '...',
      '4',
      '5',
      '6',
      '7',
      '8',
      '...',
      '10',
    ]);
  });

  it('should render all pages when total pages is less than maxPages', () => {
    fixture.componentRef.setInput('maxPages', 5);
    fixture.componentRef.setInput('totalPages', 3);
    fixture.componentRef.setInput('currentPage', 1);
    fixture.detectChanges();

    const pageButtons = getAllPageButtons();
    const pageLabels = pageButtons.map(btn => btn.nativeElement.textContent.trim());
    
    expect(pageLabels).toEqual(['1', '2', '3']);
  });

  it('should handle page selection correctly', () => {
    const pageChangeSpy = jasmine.createSpy('pageChange');
    component.pageChange.subscribe(pageChangeSpy);

    const pageButtons = getAllPageButtons();
    pageButtons[2].nativeElement.click(); // Click on the third visible page

    expect(pageChangeSpy).toHaveBeenCalled();
  });

  it('should not emit for ellipsis clicks', () => {
    fixture.componentRef.setInput('maxPages', 3);
    fixture.componentRef.setInput('currentPage', 5);
    fixture.componentRef.setInput('totalPages', 10);
    fixture.detectChanges();

    const pageChangeSpy = jasmine.createSpy('pageChange');
    component.pageChange.subscribe(pageChangeSpy);

    const pageButtons = getAllPageButtons();
    const ellipsisButton = pageButtons.find(btn => 
      btn.nativeElement.textContent.trim() === '...');
    
    ellipsisButton?.nativeElement.click();
    expect(pageChangeSpy).not.toHaveBeenCalled();
  });

  it('should mark current page as active', () => {
    fixture.componentRef.setInput('currentPage', 2);
    fixture.detectChanges();

    const pageButtons = getAllPageButtons();
    // Find the active button by checking its classList
    const activeButton = pageButtons.findIndex((btn) =>
      btn.nativeElement.classList.contains('bg-blue-500') && 
      btn.nativeElement.classList.contains('text-white')
    );
    expect(activeButton).toBe(1); // 0-based index
  });
});
