import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AddressService } from '../service/address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private addressService:AddressService,private router:Router) { }

  ngOnInit() {
  }

  updateAddress(addressForm:NgForm){
    if(addressForm.valid){
      console.log(addressForm.value);
      this.addressService.updateAddressService(addressForm.value);
      this.router.navigate(['/payment']);
    }
  }

}
