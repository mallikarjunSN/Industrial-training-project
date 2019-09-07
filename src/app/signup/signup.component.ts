import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupService } from '../service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private signupService:SignupService) { }

  ngOnInit() {
  }


  signUp(signupForm:NgForm){
    if(signupForm.valid){
      // var user={
      //   username:signupForm.value.username,
      //   phone:signupForm.value.phone,
      //   password:signupForm.value.password,
      //   cart:signupForm.value.cart
      // }

      console.log('signup initiated',signupForm.value);
      this.signupService.signupServices(signupForm.value);
      // if(this.signupService.signupServices(user)==false)
    }
  }

}
