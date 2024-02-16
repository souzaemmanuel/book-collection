import { TestBed } from '@angular/core/testing';
import { BooksService } from './book.service';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Book } from '../models/book-model';
import { BookType } from '../enumerators/book-type';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BooksService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchAll()', () => {
    it('should fetch all books from API and update allBooks property', () => {
      const mockBooks = [
        {
          id: 1,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          publishedDate: '1925-04-10',
          description:
            'A novel depicting the glamour and decadence of the Jazz Age. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum ex vitae ullamcorper.',
          img: 'assets/images/great_gatsby.jpg',
          type: 'fiction',
        },
      ] as Book[];
      service.fetchAll().subscribe((books) => {
        expect(books).toEqual(mockBooks);
        //@ts-ignore
        expect(service.allBooks).toEqual(mockBooks);
      });

      //@ts-ignore
      const req = httpMock.expectOne(`${service.baseUrl}`);
      req.flush(mockBooks);

      expect(req.request.method).toBe('GET');
    });
  });

  describe('delete()', () => {
    it('should delete a book from API and update allBooks property', (done) => {
      const bookId = 123;
      const mockBooks = [
        {
          id: 1,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          publishedDate: '1925-04-10',
          description:
            'A novel depicting the glamour and decadence of the Jazz Age. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum ex vitae ullamcorper.',
          img: 'assets/images/great_gatsby.jpg',
          type: 'fiction',
        },
      ] as Book[];

      // @ts-ignore
      service.allBooks = mockBooks;

      service.delete(bookId).subscribe((books) => {
        expect(books).toEqual(mockBooks);
        // @ts-ignore
        expect(service.allBooks).toEqual(mockBooks);
      });

      done();
      // @ts-ignore
      const req1 = httpMock.expectOne(`${service.baseUrl}/${bookId}`);
      expect(req1.request.method).toBe('DELETE');
      req1.flush([]);

      // @ts-ignore
      const req2 = httpMock.expectOne(`${service.baseUrl}`);
      expect(req2.request.method).toBe('GET');
      req2.flush([]);
    });
  });

  describe('create()', () => {
    it('should create a book via API and update allBooks property', (done) => {
      const newBook: Book = {
        title: 'title',
        author: 'author',
        description: 'description',
        publishedDate: '2024-02-16',
        img: 'https://www.img.com',
        type: BookType.BIOGRAFY,
      };

      const mockBooks = [
        {
          id: 1,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          publishedDate: '1925-04-10',
          description:
            'A novel depicting the glamour and decadence of the Jazz Age. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum ex vitae ullamcorper.',
          img: 'assets/images/great_gatsby.jpg',
          type: 'fiction',
        },
      ] as Book[];

      // @ts-ignore
      service.allBooks = mockBooks;

      service.create(newBook).subscribe((books) => {
        expect(books).toEqual(mockBooks);
        // @ts-ignore
        expect(service.allBooks).toEqual(mockBooks);
      });
      done();

      // @ts-ignore
      const req = httpMock.expectOne(`${service.baseUrl}`);
      expect(req.request.method).toBe('POST');
      req.flush(newBook);

      // @ts-ignore
      const req2 = httpMock.expectOne(`${service.baseUrl}`);
      expect(req2.request.method).toBe('GET');
      req2.flush([]);
    });
  });

  describe('search()', () => {
    it('should return all books when searchTerm is empty', () => {
      const searchTerm = '';
      const mockBooks = [
        {
          id: 1,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          publishedDate: '1925-04-10',
          description:
            'A novel depicting the glamour and decadence of the Jazz Age. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum ex vitae ullamcorper.',
          img: 'assets/images/great_gatsby.jpg',
          type: 'fiction',
        },
      ] as Book[];

      // @ts-ignore
      service.allBooks = mockBooks;
      const result$ = service.search(searchTerm);
      result$.subscribe((books) => {
        expect(books).toEqual(mockBooks);
      });
    });

    it('should return filtered books when searchTerm is not empty', () => {
      const searchTerm = 'specific';
      const allBooks = [
        {
          title: 'Specific Test Book 1',
          description: 'Description 1',
          author: 'Author 1',
          publishedDate: '2022-01-01',
          type: 'Fiction',
        },
        {
          title: 'Test Book 2',
          description: 'Description 2',
          author: 'Author 2',
          publishedDate: '2022-01-02',
          type: 'Biography',
        },
      ];

      // @ts-ignore
      service.allBooks = allBooks;
      const result$ = service.search(searchTerm);
      result$.subscribe((books) => {
        expect(books.length).toBe(1);
        expect(books[0].title).toBe('Specific Test Book 1');
      });
    });
  });
});
