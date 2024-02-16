import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../../models/book-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  @Input() book?: Book;

  @Output() delete = new EventEmitter<number>();

  deleteBook(): void {
    this.delete.emit(this.book?.id);
  }
}
