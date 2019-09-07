import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book.model';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { LoginService } from '../service/login.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ToolbarService } from '../service/toolbar.service';
import { Subscription } from 'rxjs';
import { ViewService } from '../service/view.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popular:Book;

  books :Book[]=[];

  constructor(private viewService:ViewService,private homeService:HomeService,private router:Router,private loginService:LoginService,private toolbarService:ToolbarService) {
    this.books=this.homeService.getAll();
    this.slideCount=this.books.length;
   }

  user:User;

  private homeSub=new Subscription;

  message:String;

  slideCount:any=0;

  n:any=0;

  ngOnInit() {
    this.user=this.loginService.getUserInfo();
    if(this.user!=null){
      this.message="hello  "+this.user.username;
      this.books=this.homeService.getAll();
      this.slideCount=this.books.length;
      this.popular=this.books[1];
      console.log('gigigiuov');
    }
    this.homeSub=this.homeService.getHomeUpdateListener()
      .subscribe((book:Book[])=>{
        this.books=book;
        console.log(this.books);
      })
      this.popular=this.books[0];
      this.slideCount=this.books.length;
      console.log('slid',this.slideCount);

  }

  next(){
    if(this.n==this.books.length){
      this.n=0;
    }
    this.popular=this.books[this.n++];
    console.log('hello man ',this.n);
  }

  prev(){
    if(this.n==1||this.n==0){
      this.n=this.books.length;
    }
    if(this.n!=0){
      this.popular=this.books[--this.n];
      console.log('hello man ',this.n);
    }
  }

  getAllBooks(){
    return this.books;
  }

  viewBook(book:Book){
    if(book!=null){
      this.viewService.updateBook(this.popular);
    this.router.navigate(['/bookview']);
    console.log(book);
    }
  }

  ngOnDestroy(){
    this.homeSub.unsubscribe();
  }

}
