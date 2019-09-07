import { Component, OnInit } from '@angular/core';
import { PaymentComponent } from '../payment/payment.component';
import { User } from '../model/user.model';
import { LoginService } from '../service/login.service';
import { Book } from '../model/book.model';
import { Subscription } from 'rxjs';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private loginService:LoginService,private orderService:OrderService) { }

  user :User;

  error:String='';

  private orderSub=new Subscription;

  orders: Book[]=[];
  ngOnInit() {
    this.user=this.loginService.getUserInfo();
    this.orders=this.user.orders;

    this.orderSub=this.orderService.getOrderUpdateListener().
    subscribe((order:Book[])=>{
      this.orders=order;
      if(this.orders.length==0){
        this.error="You have not placed any orders yet!!";
      }
    })
  }


  ngOnDestroy(){
    this.orderSub.unsubscribe();
  }
  

}
