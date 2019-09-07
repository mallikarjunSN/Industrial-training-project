import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { LoginService } from './login.service';
import { Book } from '../model/book.model';
import { CartModel } from '../model/cart.model';
import { Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http : HttpClient,private loginService :LoginService) { }


  private cartUpdate=new Subject<Book[]>();

  user:User;

  cart : Book[]=[];

  getCartUpdated(){
    this.user=this.loginService.getUserInfo();
    console.log('inside getcart updated USER ::',this.user);
    this.http.post('http://localhost:1025/books/getcart',this.user).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log('inside cart update fn',responseData);
        this.cart=responseData["data"]["cart"];

        this.cartUpdate.next(this.cart);
        // console.log('inside cart update fn2',this.cart);
      }else if(responseData["status"]=="empty"){
        console.log('empty cart');
        window.alert('cart is empty');
      }
    })

  }

  addToCartService(book:Book,user:User){
    this.getCartUpdated();
    this.cart=this.getCart()
    if(this.cart.indexOf(book[0])!=-1){
      window.alert('This book is already in the cart!!!',);
    }
    else{
      book.quantity=1;
    const userJson={
      user:user,
      book:book
    }
  
    this.http.post('http://localhost:1025/books/addtocart',userJson).subscribe((responsedata)=>{
      console.log('inside demoSevice ::',userJson);
      if(responsedata["status"]=="success"){

        this.cartUpdate.next(responsedata["data"]);
        this.getCartUpdated();
        console.log('book added to successfully',responsedata["data"]);
        window.alert('This book is added to cart!!!',);

      }
      else{
        window.alert('This book is not added to cart!!!',);
        console.log('book was not added ',responsedata);
      }
    })
    }

  }

  getCartUpdateListener(){
    return this.cartUpdate.asObservable();
  }

  getCart(){
    return this.cart;
  }
}
