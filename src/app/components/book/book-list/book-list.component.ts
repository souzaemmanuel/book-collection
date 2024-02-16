import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card.component';
import { Book } from '../../../models/book-model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  imports: [BookCardComponent],
})
export class BookListComponent {
  @Input() books?: Array<Book> | null;

  @Output() deleteBook = new EventEmitter<number>();

  delete(bookId: number): void {
    this.deleteBook.emit(bookId);
  }
}
