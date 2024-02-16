import { BookType } from '../enumerators/book-type';

export interface Book {
  id?: number;
  title: string;
  author: string;
  publishedDate: string;
  description: string;
  img: string;
  type: BookType;
}
