import { Review } from './review.model';
import { Url } from 'url';

export interface Book {
    _id:Number;
    title: String;
    author: String;
    language:String;
    genre:String;
    pages: Number;
    price: Number;
    reviews:Review[];
    quantity:Number;
    url:String;
}