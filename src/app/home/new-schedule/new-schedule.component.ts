
import { ChangeDetectionStrategy,ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  NotificationService } from 'src/app/_helpers';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import isSameDay from 'date-fns/isSameDay';
import startOfDay from 'date-fns/startOfDay';
import { HomeService } from '../home.service';

@Component({
  selector: 'new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewScheduleComponent {
  today=startOfDay(new Date());
  start_date;
  end_date;
  start_time;
  end_time;
  signupform: FormGroup;
  constructor(private fb: FormBuilder,
              private router:Router,
              private notify:NotificationService,
              private homeService:HomeService) {

  }

  submit() {
    if(this.signupform.valid){
      this.homeService.createSchedule({...this.signupform.value,end:this.end_time.getTime(),start:this.start_time.getTime()}).subscribe((resp)=>{
        if(resp&&resp.message){
          this.notify.success(resp.message);
          this.homeService.closeCreatePopup.next(true);
        }
      })
    }
  }

  ngOnInit(){
    this.signupform = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9,. ]*')]],
      description: [''],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      start_time:['', [Validators.required]],
      end_time:['', [Validators.required]]
    });
  }
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(new Date(),current ) > 0;
  };
  disabledEndDate = (start_date,current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(start_date||new Date(),current ) > 0;
  };
  disabledHours(start_date): number[] {
    if(isSameDay(start_date,new Date())){
      let disabledDates=[];
      for(let i=0;i<new Date().getHours();i++){
        disabledDates.push(i);
      }
      return disabledDates;
    }
    
    return [];
  }
  disabledEndHours(start_date,end_date,start_time): number[] {
    if(isSameDay(start_date,end_date)||isSameDay(new Date(),end_date||isSameDay(start_time,end_date))){
      let hours=start_time?start_time.getHours():new Date().getHours();
      let disabledDates=[];
      for(let i=0;i<hours;i++){
        disabledDates.push(i);
      }
      return disabledDates;
    }
    
    return [];
  }
  disabledMinutes(start_date,hour: number): number[] {
    if (hour === new Date().getHours() && isSameDay(start_date,new Date())) {
      let disabledDates=[];
      for(let i=0;i<new Date().getMinutes();i+=15){
        disabledDates.push(i);
      }
      return disabledDates;
    } else {
      return [];
    }
  }
  disabledEndMinutes(end_date,start_time,hour: number): number[] {
    if ((hour === new Date().getHours() && isSameDay(end_date,new Date()))||(start_time && hour === start_time.getHours() && isSameDay(end_date,start_time)) ){
      let minutes=start_time?start_time.getMinutes():new Date().getMinutes();
      let disabledDates=[];
      for(let i=0;i<minutes;i+=15){
        disabledDates.push(i);
      }
      return disabledDates;
    } else {
      return [];
    }
  }
  onStartDateChange(event){
    this.start_date=event;
    this.signupform.patchValue({start_date:event});
  }
  onStartTimeChange(event){
    this.start_time=event;
    this.signupform.patchValue({start_time:event});
  }
  onEndDateChange(event){
    this.end_date=event;
    this.signupform.patchValue({end_date:event});
  }
  onEndTimeChange(event){
    this.end_time=event;
    this.signupform.patchValue({end_time:event});
  }
}
