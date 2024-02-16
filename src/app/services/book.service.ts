import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book-model';
import { Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private baseUrl = 'http://localhost:3000/books';
  constructor(private http: HttpClient) {}
  private allBooks: Array<Book> = [];

  fetchAll(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(this.baseUrl).pipe(
      tap((books: Book[]) => {
        this.allBooks = books;
      })
    );
  }

  delete(bookId: number): Observable<Array<Book>> {
    return this.http
      .delete<Array<Book>>(`${this.baseUrl}/${bookId}`)
      .pipe(switchMap(() => this.fetchAll()));
  }

  create(book: Book): Observable<Array<Book>> {
    return this.http
      .post<Book>(`${this.baseUrl}`, book)
      .pipe(switchMap(() => this.fetchAll()));
  }

  search(searchTerm: string): Observable<Array<Book>> {
    if (searchTerm === '') {
      return of(this.allBooks);
    }

    //that is a local search
    const filteredList = this.allBooks.filter(
      (c) =>
        c.type.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
        c.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
        c.author.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
        c.publishedDate
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
        c.description
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
    );
    return of(filteredList);
  }
}
