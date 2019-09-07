import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, RouterStateSnapshot,  } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate{
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  | boolean {
    return true;
  }
}

