import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { User } from '../model/user.model';
import { Book } from '../model/book.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient,private loginService:LoginService) { }

  user :User;

  books:Book[]=[];

  private homeUpdated=new Subject<Book[]>();

  getAllBooks(){
    this.user=this.loginService.getUserInfo();
    this.http.post('http://localhost:1025/books/getallbooks',this.user).subscribe((responseData)=>{
        if(responseData["status"]=="success"){
          this.books=responseData["data"];
          this.homeUpdated.next(this.books);
          console.log('Inside get all books :: success',this.books)
        }else if(responseData["status"]=="failure"){
          console.log("Inside get all books ::no books were found!!")
        }
        else{
          console.log('there is some error');
        }
    })
  }

  getHomeUpdateListener(){
    return this.homeUpdated.asObservable();
  }

  getAll(){
    this.getAllBooks();
    return this.books;
  }
}
