import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DemoComponent } from './demo/demo.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';
import { ExploreComponent } from './explore/explore.component';
import { LoginGuard } from './login.guard';
import { BookviewComponent } from './bookview/bookview.component';

const routes: Routes = [
  {path:'login',component :LoginComponent},
  {path:'demo',component :DemoComponent},
  {path:'signup',component:SignupComponent},
  {path:'cart',component:CartComponent},
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'search',component:SearchComponent},
  {path:'address',component:AddressComponent},
  {path:'payment',component:PaymentComponent},
  {path:'explore',component:ExploreComponent},
  {path:'order',component:OrderComponent},
  {path:'explore/:id',component:ExploreComponent},
  {path:'bookview',component:BookviewComponent},
  {path:'**',component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
