import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { BooksService } from '../../services/book.service';
import { Router, RouterModule } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let bookService: BooksService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule],
      providers: [BooksService, Router],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    bookService = TestBed.inject(BooksService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('filterList()', () => {
    it('should call bookService.search() with searchTerm', () => {
      const searchTerm = 'test';
      //@ts-ignore
      jest.spyOn(component.bookService, 'search');

      component.filterList(searchTerm);

      //@ts-ignore
      expect(component.bookService.search).toHaveBeenCalledWith(searchTerm);
    });
  });

  describe('deleteBook()', () => {
    it('should call bookService.delete() with bookId', () => {
      //@ts-ignore
      jest.spyOn(component.bookService, 'delete');

      const bookId = 123;

      component.deleteBook(bookId);

      //@ts-ignore
      expect(component.bookService.delete).toHaveBeenCalledWith(bookId);
    });
  });

  describe('goToCreateBookForm()', () => {
    it('should navigate to "/new" route', () => {
      jest.spyOn(router, 'navigate');
      component.goToCreateBookForm();

      expect(router.navigate).toHaveBeenCalledWith(['/new']);
    });
  });
});
