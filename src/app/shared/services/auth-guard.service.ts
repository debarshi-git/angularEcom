import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot } from '@angular/router';

//admin before LogIn check-->
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardLogIn  implements CanActivate{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    if(role=="admin")
    {  this.router.navigate(["/admin-dashboard"]);
      return false;//it will not take to the previous page..it will keep there..
    }
    else
    {
      return true; // not admin..so can't enter..go out side..
    }
  }
}
//admin after LogIn check--> it will inject service.. 
//if the role is admin ..it will let you in..otherwise redirect to login..
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    if(role=="admin")
    {  
      return true;
    }
    else
    {
      this.router.navigate(["/admin-login"]);
      return false;
    }
  }
}

// for customer..buyer and seller.. before  check..
@Injectable({
  providedIn: 'root'
})
export class SellerBuyerAuthGuardlogIn implements CanActivate{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    if(role=="seller")
    {  
      this.router.navigate(["/seller-dashboard"]);
      return false;
    }
    else if(role=="bayer")
    {
      this.router.navigate(["/bayer-dashboard"]);
      return false;
    }
    else
    {
      return true;
    }
  }
}

//Buyer after login check..
@Injectable({
  providedIn: 'root'
})
export class BuyerAuthGuardService{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    if(role=="buyer")
    {  
      return true;
    }
    else
    {
      this.router.navigate(["/sign-in"]);
      return false;
    }
  }
}


//seller after login check..
@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuardService{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role = sessionStorage.getItem("role");
    if(role=="seller")
    {  
      return true;
    }
    else
    {
      this.router.navigate(["/sign-in"]);
      return false;
    }
  }
}
