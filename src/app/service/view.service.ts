import { Injectable } from '@angular/core';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  newBook:Book;

  constructor() {
  }

  updateBook(book:Book){
    this.newBook=book;
    console.log(this.newBook);
  }

  getBook(){
    return this.newBook;
  }
}
