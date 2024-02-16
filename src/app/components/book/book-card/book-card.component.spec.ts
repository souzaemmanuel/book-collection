import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardComponent } from './book-card.component';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete event with book id', () => {
    const bookId = 123;
    const emitSpy = jest.spyOn(component.delete, 'emit');

    component.book = { id: bookId } as any;
    component.deleteBook();

    expect(emitSpy).toHaveBeenCalledWith(bookId);
  });
});
