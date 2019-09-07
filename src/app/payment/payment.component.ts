import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Book } from '../model/book.model';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  ngOnInit() {
  }

  paystatus :Boolean =false;

  fn(){
    // console.log('hello');
  }

  payment='upi';

  place(){
    this.paystatus=true;
    this.orderService.placeOrder();
  }

}
