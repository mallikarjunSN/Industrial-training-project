import { Injectable } from '@angular/core';
import { Book } from '../model/book.model';
import { PaymentComponent } from '../payment/payment.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { LoginService } from './login.service';
import { CartService } from './cart.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient,private router:Router,private loginService:LoginService,private cartService:CartService) { }


  orders : Book[]=[];

  user :User;

  private ordersUpdated=new Subject<Book[]>();

  placeOne(cart:Book){
    this.user=this.loginService.getUserInfo();
    if(this.user.orders.findIndex(cart[0])!=-1){
      window.alert(cart.title+'has already been Ordered');
    }
    else{
      if(this.user.status){
      console.log('hello');
      this.router.navigate(['/payment']);
      }
      else {
        console.log('hello');
        this.router.navigate(['/address']);
      }
      this.orders.push(cart);
      console.log(cart);
    }
  }


  placeMany(cart:Book[]){
    this.user=this.loginService.getUserInfo();
    this.orders=cart;

    if(this.user.status){
      console.log('hello');
      this.router.navigate(['/payment']);
    }
    else {
      console.log('hello');
      this.router.navigate(['/address']);
    }
    console.log('inside place manyOrders',cart);
  }

  placeOrder(){
    this.user=this.loginService.getUserInfo();
    const order={
      user:this.user,
      orders:this.orders
    };

    this.http.post('http://localhost:1025/auth/placeorder',order).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log('order placed successfully');
        window.alert('order placed successfully');
        this.cartService.getCartUpdated();
        
        this.ordersUpdated.next(this.orders);

        this.router.navigate(['/order']);
      }
      else if(responseData["status"]=="failure"){
        console.log('order placeing was unsuccessful');
        window.alert('order placeing was unsuccessful');
        this.router.navigate(['/home']);
      }
      else{
        console.log('there is some error sorry');
      }
    })

  }

  getOrders(){
    return this.orders;
  }

  getOrderUpdateListener(){
    return this.ordersUpdated.asObservable();
  }

}
