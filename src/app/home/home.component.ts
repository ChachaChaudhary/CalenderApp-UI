import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { NotificationService, GetUserIdService } from '../_helpers';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NewScheduleComponent } from './new-schedule/new-schedule.component';
import startOfDay from 'date-fns/startOfDay';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    public isCollapsed = false;
    visible = false;
    public name:any;
    createPopup:NzModalRef;
    schedules;
    constructor(private homeService:HomeService,private router:Router,
        private notify:NotificationService, private userService:GetUserIdService,private modalService: NzModalService) {
      let userData = userService.getDecryptedToken();
       this.name=userData.name;
    }

    ngOnInit() {
        this.homeService.closeCreatePopup.subscribe(closePopup=>{
            if(closePopup){
                this.createPopup.close();
                this.getUserSchedule();
            }
        })
      this.getUserSchedule();
    }

    logout() {       
        this.homeService.logout().subscribe((resp) => {
            if(this.homeService.deleteToken()) {
                this.notify.success('Logged out successfully');         
                this.router.navigate(['/auth/login']);
            }
        })
        
    }
    showCreatePopup(){
        this.createPopup=this.modalService.create({
            nzTitle: 'New Appointment',
            nzContent: NewScheduleComponent,
            nzFooter:null,
            nzMaskClosable:false
          });
    }
    getUserSchedule(){
        this.homeService.getUserSchedule({start:startOfDay(new Date()).getTime()}).subscribe((resp)=>{
            let data=resp||[];
            if(data.length>0)data.sort((a,b)=>a.start_time-b.start_time);
            this.schedules=data;
           
        });
    }

}
