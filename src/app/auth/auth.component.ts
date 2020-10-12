import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'auth',
    styleUrls: ['./auth.component.scss'],
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
    showSignIn: boolean = false;
    constructor(router: Router) {
      
      router.events.subscribe(val => {
        if (val instanceof NavigationEnd ) {
            let pathArr = location.pathname.split('/');
            let path = pathArr[pathArr.length - 1];
            this.showSignIn = false;
            if (path === "signup") {
                console.log(location.pathname);
                this.showSignIn = true;
            }
        }
      });
    }

    ngOnInit() {
      
    }
}
