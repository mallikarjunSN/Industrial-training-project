import { Injectable } from '@angular/core';
import { Book } from '../model/book.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private http :HttpClient) { }

  demoService(book:Book){
    book.quantity=1;
  
    this.http.post('http://localhost:1025/books/addbook',book).subscribe((responsedata)=>{
      console.log('inside demoSevice ::',book);
      if(responsedata["status"]=="success"){
        console.log('book added to successfully',responsedata);
      }
      else{
        console.log('book was not added ',responsedata);
      }
    })

  }

}
