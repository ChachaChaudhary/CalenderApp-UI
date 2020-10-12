import { Injectable } from '@angular/core';
import { CustomTokenService } from './customtoken.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
    providedIn:'root'
})
export class NotificationService {
    private userData:any;
    private loader:any; 

     constructor(private message: NzMessageService, private router: Router) {}

    public error(msg: string = '') {
        this.message.error(msg);
    }

    public success(msg: string = '') {
        this.message.success(msg);
    }

    public showLoading(msg: string = 'Loading...') {
        this.loader = this.message.loading(msg, { nzDuration: 0 }).messageId;
    }

    public removeLoading() {
        this.message.remove(this.loader);
    }
}