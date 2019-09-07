import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient,private router:Router) { }

  
  signupServices(user: User){
    // user.address.status=false;
    console.log('beginning of userSignUp',user);
    this.http.post('http://localhost:1025/auth/signup',user).subscribe((responseData) => {
      console.log("Result :: " ,responseData);
      if(responseData["status"]!="duplicate"){
        if(responseData["status"] == "success"){
            window.alert("Account created Successfully!!");
            this.router.navigate(['/home']);
        }
        else{
          window.alert("phone number already registered,try with another number");
      }}
      else{
        window.alert("phone number already registered,try with another number");
        return false;
      }
    });

  }



}
