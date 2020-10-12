import { Injectable } from '@angular/core';
import { ApiService } from '../_helpers/api.service';

@Injectable()
export class AuthService {
  PATH: string = 'auth/';
  LOGIN: string = 'login';
  REGISTER: string = 'signup';
  LOGOUT:string = 'logout';

  constructor(private apiService: ApiService) {}

  public login(data: any) {
    return this.apiService.post(this.PATH+this.LOGIN, data);
  }

  public register(data: any) {
    return this.apiService.post(this.PATH+this.REGISTER, data);
  }

  
}