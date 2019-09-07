import { Component, OnInit } from '@angular/core';
import { SearchService } from '../service/search.service';
import { NgForm, FormsModule } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Subscription } from 'rxjs';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  logInfo:Boolean=false;

  constructor(private router:Router,private searchService:SearchService,private loginService:LoginService,private cartService:CartService) {        
    // this.logInfo=this.loginService.logInfo;
  }

  private logSubs =new Subscription;


  ngOnInit() {
    this.logInfo=this.loginService.logInfo;
    this.logSubs=this.loginService.getLoginUpdateListener()
    .subscribe((val: Boolean) => {
      this.logInfo = val;
    })
  }

  gotoCart(){
    if(this.logInfo==false){
      this.router.navigate(['/login']);
    }else{
      this.cartService.getCartUpdated();
      this.router.navigate(['/cart']);
    }
  }

  updateLog(value:Boolean){
    this.logInfo=value;
  }

  searchBooks(input:NgForm){
    this.logInfo=this.loginService.logInfo;
      console.log(input.value);
      var inp=input.value;
      if(input.valid){
      this.searchService.searchBooks(inp);
      }
  }

  ngOnDestroy(){
    this.logSubs.unsubscribe();
  }
}
