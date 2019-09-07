import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DemoService } from '../service/demo.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor(private demoService : DemoService,private loginService : LoginService,private router : Router) { }

  user : User;
  userSubs : Subscription;

  

  ngOnInit() {
    this.user=this.loginService.getUserInfo();
    // this.userSubs = this.loginService.getUpdateListener().
    // subscribe((userr:User)=>{
    //   this.user=userr;
    //   console.log('inside OnInit()',this.user.username);
    // });

  }
  addBook(bookForm : NgForm){
      console.log(bookForm.value);
      this.demoService.demoService(bookForm.value);
  }

  gotoCart(){
    this.router.navigate(['/cart']);
  }

}
