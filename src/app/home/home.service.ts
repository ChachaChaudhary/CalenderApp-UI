import { Injectable } from '@angular/core';
import { CustomTokenService } from '../_helpers';
import { ApiService } from '../_helpers/api.service';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HomeService {
  PATH: string = 'auth/';
  LOGOUT:string = 'logout';
  isObjectEdit: boolean = false;
  isObjectDetailsView: boolean = false;
  objectEditData: any;
  closeCreatePopup:Subject<boolean>=new Subject();
  constructor(private tokenService: CustomTokenService, private apiService:ApiService) {}

  public deleteToken() {    
    this.tokenService.deleteToken();
    return true;
  }

  public logout() {
    return this.apiService.get(this.LOGOUT,false,'logging out');
       
  }
  public createSchedule(data) {
    return this.apiService.post('schedule/create',data,false,'Creating Appointment');
       
  }
  public getUserSchedule(data){
    return this.apiService.get('schedule/list',data,false,'Loading Appointments...')
  }
}