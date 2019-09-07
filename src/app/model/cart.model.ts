import { Book } from './book.model';

export interface CartModel{
    book:Book;
    quantity:Number;
}