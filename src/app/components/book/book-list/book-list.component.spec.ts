import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('delete()', () => {
    it('should emit delete event with book id', () => {
      const bookId = 123;
      const emitSpy = jest.spyOn(component.deleteBook, 'emit');

      component.delete(bookId);

      expect(emitSpy).toHaveBeenCalledWith(bookId);
    });
  });
});
