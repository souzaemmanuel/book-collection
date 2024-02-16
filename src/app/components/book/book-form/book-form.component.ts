import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BookType } from '../../../enumerators/book-type';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../../services/book.service';
import { Book } from '../../../models/book-model';
import { take } from 'rxjs';
import {
  dateLowerThanTodayValidator,
  urlValidator,
} from '../../../constants/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
  bookTypes = Object.values(BookType);
  submmited = false;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    publishedDate: new FormControl('', [
      Validators.required,
      dateLowerThanTodayValidator,
    ]),
    img: new FormControl('', [Validators.required, urlValidator]),
    type: new FormControl('', [Validators.required]),
  });

  constructor(private bookService: BooksService, private router: Router) {}

  saveBook(): void {
    this.submmited = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Missing required field(s).');
      return;
    }

    const book = this.form.value as Book;
    this.bookService
      .create(book)
      .pipe(take(1))
      .subscribe(() => {
        alert('Book added successfully.');
        this.router.navigate(['']);
      });
  }
}
