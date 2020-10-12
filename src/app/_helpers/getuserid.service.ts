import { Injectable } from '@angular/core';
import { CustomTokenService } from './customtoken.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class GetUserIdService {

    constructor(private tokenUtilService: CustomTokenService, private router: Router) {}
    rolePermissions=[];
    public getUserId() {
        let userData = this.getDecryptedToken();
        if(userData) {
            return userData.userId;
        }
        return null;
    }

    public getUserName() {
        let userData = this.getDecryptedToken();
        if(userData){
            return userData.name;
        }
        return null;
    }

    public getDecryptedToken() {
        let token = this.tokenUtilService.getToken();
        if (token && this.tokenUtilService.isValid(token)) {
            let userData = this.tokenUtilService.decodeJwt(token);
            this.rolePermissions=userData.access||[];
            return userData;
        }

        return null;
    }
}