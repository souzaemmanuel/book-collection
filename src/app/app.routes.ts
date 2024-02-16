import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookFormComponent } from './components/book/book-form/book-form.component';

export const routes: Routes = [
  {
    path: 'new',
    component: BookFormComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];
