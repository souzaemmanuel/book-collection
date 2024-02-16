import { Component } from '@angular/core';
import { BooksService } from '../../services/book.service';
import { Book } from '../../models/book-model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { BookListComponent } from '../../components/book/book-list/book-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [BooksService],
  imports: [BookListComponent, CommonModule, SearchBarComponent],
})
export class HomeComponent {
  books$: Observable<Book[]> = this.bookService.fetchAll();

  constructor(private bookService: BooksService, private router: Router) {}

  filterList(searchTerm: string): void {
    console.log('searchTerm: ', searchTerm);
    this.books$ = this.bookService.search(searchTerm);
  }

  deleteBook(bookId: number): void {
    this.books$ = this.bookService.delete(bookId);
  }

  goToCreateBookForm(): void {
    this.router.navigate(['/new']);
  }
}
