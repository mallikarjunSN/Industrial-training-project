import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../model/book.model';
import { HomeService } from '../service/home.service';
import { ViewService } from '../service/view.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  books :Book[]=[];

  id :String;

  genreBooks:Book[]=[];

  constructor(private route: ActivatedRoute,private homeService:HomeService,private viewService:ViewService,private router:Router) { 
    this.route.params.subscribe(params => {
      this.id = params.id;
      console.log(this.id);
      });
    this.books=homeService.getAll();

    // for(let i of this.books){
    //   this.genreBooks=[];
    //   if(i.genre==this.id){
    //     this.genreBooks.push(i);
    //   }
    // }
    
  }




 

  ngOnInit() {
    // console.log(this.books);

    // this.route.params.subscribe(params => {
    //   this.id = params.id;
    //   console.log(this.id);
    //   });
    // this.books=this.homeService.getAll();
    this.genreBooks=[];
    for(let i of this.books){
      if(i.genre==this.id||i.language==this.id){
        this.genreBooks.push(i);
      }
    }
    console.log(this.genreBooks);
  }

  viewBook(book:Book){
    if(book!=null){
    this.router.navigate(['/bookview']);
    this.viewService.updateBook(book);
    console.log(book);
    }
  }

}
