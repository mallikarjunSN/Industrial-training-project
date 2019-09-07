import { Injectable } from '@angular/core';
import { Address } from '../model/address.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http:HttpClient,private loginService:LoginService) { }

  user :User;

  updateAddressService(address:Address){
    this.user=this.loginService.getUserInfo();

    const addr={
      address:address,
      user:this.user
    };

    this.http.post('http://localhost:1025/auth/updateaddress',addr).subscribe((responseData)=>{
      console.log(responseData);
      if(responseData["status"]=="success"){
        console.log('address updated successfully');
      }
      else if(responseData["status"]=="failure"){
        console.log('address updated unsuccessful!!!');
      }
    })

  }



  
}
