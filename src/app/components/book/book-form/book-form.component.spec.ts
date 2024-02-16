import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookFormComponent } from './book-form.component';
import { HttpClientModule } from '@angular/common/http';
import { BooksService } from '../../../services/book.service';
import { RouterModule } from '@angular/router';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  let mockBookService: BooksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule],
      providers: [BooksService],
    }).compileComponents();

    fixture = TestBed.createComponent(BookFormComponent);
    mockBookService = TestBed.inject(BooksService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('saveBook()', () => {
    it('should set submitted to true', () => {
      component.submmited = false;
      component.saveBook();
      expect(component.submmited).toBe(true);
    });

    it('should not call create method if form is invalid', () => {
      jest.spyOn(mockBookService, 'create');
      component.saveBook();
      expect(mockBookService.create).not.toHaveBeenCalled();
    });

    it('should call create method with correct data and navigate on success', () => {
      jest.spyOn(mockBookService, 'create');
      component.form.patchValue({
        title: 'title',
        author: 'author',
        description: 'description',
        publishedDate: '2024-02-16',
        img: 'https://www.img.com',
        type: 'type',
      });

      component.saveBook();

      expect(mockBookService.create).toHaveBeenCalled();
    });
  });
});
