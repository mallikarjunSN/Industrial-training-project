import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book.model';
import { SearchService } from '../service/search.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ViewService } from '../service/view.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  result :Book[]=[];

  constructor(private searchService:SearchService,private router:Router,private viewService:ViewService) {
  }

  private searchSubs : Subscription;

  public ngOnInit() {
    // this.result=this.searchService.getResult();
    this.searchSubs=this.searchService.getSearchUpdateListener()
    .subscribe((res:Book[])=>{
      this.result=res;
    })
  }

  viewBook(book:Book){
    if(book!=null){
    this.router.navigate(['/bookview']);
    this.viewService.updateBook(book);
    console.log(book);
    }
  }

  ngOnDestroy(){
    this.searchSubs.unsubscribe();
  }

}
