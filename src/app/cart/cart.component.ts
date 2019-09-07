import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book.model';
import { Subscription } from 'rxjs';
import { CartService } from '../service/cart.service';
import { LoginService } from '../service/login.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { OrderService } from '../service/order.service';
import { ViewService } from '../service/view.service';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cart : Book[]=[];

  user :User;

  private cartSub=new Subscription;
  
  constructor(private cartService : CartService,private loginService :LoginService,private router:Router,private orderService:OrderService,private viewService:ViewService) {
    // this.cartService.getCartUpdated();
    // this.cart=this.cartService.getCart();

   }

   error:String='';


  ngOnInit() {
    this.user=this.loginService.getUserInfo();
    // this.cartService.getCartUpdated();
    this.cart=this.cartService.getCart();
    this.cartSub=this.cartService.getCartUpdateListener()
      .subscribe((cart:Book[])=>{
        this.cart=cart;
        console.log(this.cart);
      })

      if(this.cart.length==0){
        this.error="Cart is empty!!";
      }
  }

  updateCart(){
    this.cartService.getCartUpdated();
    this.cart=this.cartService.getCart();
    console.log('inside update cart',this.cart);
    if(this.cart.length==0){
      this.error="Cart is empty!!";
    }
  }

  checkOut(book:Book){
    // this.paymentComponent.placeOne(book);
    book.quantity=1;
    this.orderService.placeOne(book);
  }

  chechOutAll(carts:Book[]){
    // this.paymentComponent.placeMany(carts);
    this.orderService.placeMany(carts);
  }

  viewBook(book:Book){
    if(book!=null){
    this.router.navigate(['/bookview']);
    this.viewService.updateBook(book);
    console.log(book);
    }
  }

  ngOnDestroy(){
    this.cartSub.unsubscribe();
  }
  
}
