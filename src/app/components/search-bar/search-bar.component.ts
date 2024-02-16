import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  @Output() searchTerm = new EventEmitter<string>();

  form = new FormGroup({
    searchInput: new FormControl(''),
  });

  ngOnInit(): void {
    this.form
      .get('searchInput')
      ?.valueChanges.pipe(debounceTime(400))
      .subscribe((text) => {
        if (text === null) {
          return;
        }

        this.searchTerm.emit(text);
      });
  }
}
