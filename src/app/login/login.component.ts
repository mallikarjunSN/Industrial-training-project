import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Subject } from 'rxjs';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:  ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService) { }
  ngOnInit() {
  }


  user : User ;

  userLogin(loginForm:NgForm){
      if(loginForm.valid){
        console.log("Inside userLogin",loginForm.value);
        this.loginService.userLoginService(loginForm.value);
      }else{
        return false;
      }
  }

}
