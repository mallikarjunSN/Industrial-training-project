import { Book } from './book.model';
import { Address } from './address.model';
import { CartModel } from './cart.model';

export interface User {
    username:String;
    password:String;
    phone:Number;
    address:Address;
    cart:Book[];
    orders:Book[];
    status:Boolean;
}