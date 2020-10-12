import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn:'root'
})
export class CustomTokenService {

   private jwtHelper = new JwtHelperService();
    
    decodeJwt(token: string) {
        return this.jwtHelper.decodeToken(token);
    }

    isValid(token: string) {
        console.log("expp",this.jwtHelper.isTokenExpired(token));
        return !this.jwtHelper.isTokenExpired(token);
    }
    
    deleteToken() {
        localStorage.removeItem('AUTH_TOKEN');
    }

    getToken() {
        return localStorage.getItem('AUTH_TOKEN');
    }

    setToken(token) {
        localStorage.setItem('AUTH_TOKEN', token);
    }
}
