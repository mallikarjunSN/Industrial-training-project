import { Component, OnInit } from '@angular/core';
import { ViewService } from '../service/view.service';
import { Book } from '../model/book.model';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../model/user.model';
import { CartService } from '../service/cart.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../service/login.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-bookview',
  templateUrl: './bookview.component.html',
  styleUrls: ['./bookview.component.css']
})
export class BookviewComponent implements OnInit {

  book:Book;

  constructor(private orderService:OrderService,private viewService:ViewService,private loginService:LoginService,private cartService:CartService) { 
  }

  user:User;

  private userSub =new Subscription;


  ngOnInit() {
    this.book=this.viewService.getBook();
    // window.alert(this.book.title);
    this.user=this.loginService.getUserInfo();
    this.userSub=this.loginService.getUserUpdateListener()
    .subscribe((userr:User)=>{
      console.log(userr);
      this.user=userr;
    })
    console.log(this.user);

  }

  addToCart(){
    this.cartService.addToCartService(this.book,this.user);
  }

  orderOne(){
    this.orderService.placeOne(this.book);
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}
