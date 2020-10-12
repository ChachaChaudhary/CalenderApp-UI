import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../auth/auth.service';
import { NewScheduleComponent } from './new-schedule/new-schedule.component';

@NgModule({
  imports: [SharedModule, HomeRoutingModule, CommonModule ],
  declarations: [HomeComponent,NewScheduleComponent],
  providers: [  
    HomeService,
    AuthService
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
