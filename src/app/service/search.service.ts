import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book } from '../model/book.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient,private router:Router) { }

  result : Book[]=[];

  private searchUpdate=new Subject<Book[]>();

  searchBooks(input:String){
    console.log(input);
    this.http.post('http://localhost:1025/books/search',input).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        // if(responseData["data"])
          this.result=responseData["data"];
          console.log('search result::',this.result);

          this.searchUpdate.next(this.result);

          this.router.navigate(['/search']);
      }else if(responseData["status"]=="failure"){
        window.alert('No results found');
      }
    })

  }

  getSearchUpdateListener(){
    return this.searchUpdate.asObservable();
  }

  getResult(){
      return this.result;
  }

}
