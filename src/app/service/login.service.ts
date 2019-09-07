import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { from, Subject } from 'rxjs';
import { User } from '../model/user.model';
import { ToolbarComponent } from '../toolbar/toolbar.component';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isAuthenticated: boolean = false; 

  constructor(private http : HttpClient,private router :Router) { }

  private logInformation = new Subject<Boolean>();

  private userUpdated = new Subject<User>();

  private newUser :User;

  logInfo : Boolean =false;

  userLoginService(users:User){
    console.log('beginning Login',users);
    this.http.post('http://localhost:1025/auth/login',users).subscribe((responseData) => {
      console.log("Result :: ",responseData);
      if(responseData["status"] == "success"){
        this.isAuthenticated = true;
        //this.storeAuthData(responseData["data"]["_id"],responseData["data"]["userName"],responseData["data"]["userType"])
        this.storeAuthData(responseData["data"]["_id"],responseData["data"]["userName"],responseData["data"]["userType"]);
          this.newUser=responseData["data"];
          this.logInfo=true;

          this.userUpdated.next(this.newUser);
          this.logInformation.next(this.logInfo);

          this.router.navigate(['/home']);
      }
      else if(responseData["status"]=="username not found"){
        window.alert("username not found");
      }
      else if(responseData["status"]=="failure"){
        window.alert("password is incorrect");
      }

    });
    // this.newUser=users;
    this.logInformation.next(this.logInfo);

  }

  updateLogInfo(){
    return this.logInfo;
  }

  getIsAuthenticated(){
    return this.isAuthenticated;
  }

  getUserUpdateListener(){
    return this.userUpdated.asObservable();
    // return this.logInformation.asObservable();
  }

  getLoginUpdateListener(){
    return this.logInformation.asObservable();
  }

  getUser(){
    this.http.post('http://localhost:1025/auth/getuser',this.newUser).subscribe((responseData)=>{
        if(responseData["status"]=="success"){
          console.log('user info updated');
          this.newUser=responseData["data"];
        }
        else if(responseData["status"]=="failure"){
          console.log('user info not updated');
          // this.newUser=responseData["data"];
        }else{
          console.log('sorry there is some error');
        }
    })
  }

  getUserInfo(){
    this.getUser();
    return this.newUser;
  }

  getCart(){
    return this.newUser.cart;
  }

  private storeAuthData(userID,username,usertype){
    localStorage.setItem("userID",userID);
    localStorage.setItem("username",username);
    localStorage.setItem("usertype",usertype);
  }

  private removeAuthData(){
    
    localStorage.removeItem("userID");
    localStorage.removeItem("username");
    localStorage.removeItem("usertype");
  }
  // private setAuthTimer(duration:number){
//     this.tokenTimer = setTimeout(()=>{
//         //this.logut()
//     },duration*1000)
// } 
}