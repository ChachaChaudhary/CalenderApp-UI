import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GetUserIdService } from './getuserid.service';

@Injectable({
  providedIn:'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router,private getUserIdService: GetUserIdService) {
  }

  canActivate() {
    if(this.getUserIdService.getUserId()){
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }
}
