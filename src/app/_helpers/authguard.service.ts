import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GetUserIdService } from './getuserid.service';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private getUserIdService: GetUserIdService) {
  }

  canActivate() {
    if(this.getUserIdService.getUserId()){
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
