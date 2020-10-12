import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CustomTokenService } from './customtoken.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static apiURL: string = environment.api_url;
  public headers: HttpHeaders;

  constructor(private router:Router,private httpClient: HttpClient, private notify:NotificationService, private customTokenService: CustomTokenService) {
    }      

  public baseService(url: string, body?: any, isSilent: boolean = false, loaderMsg: string = undefined, method: string = 'get',hideError: boolean = false,responseType:any ='json',observe:any ='body') {
    if (!isSilent) {
      this.notify.showLoading(loaderMsg);
    }
    return this.httpClient.request(method, url, {
      responseType: responseType,
      body,
      headers: this.headers,
      observe:observe
    }).pipe(
      map((response: any) => {
        if (!isSilent) {
          this.notify.removeLoading();
        }     
        if ((response && response.status === 200) || responseType === 'arraybuffer') {
          return response;
        }else {
          if (response && response.error) {
            this.notify.error(response.error);
          } else {          
            this.notify.error(response.message);
          }          
        }                 
      }),
      catchError(err => {
        console.log(err);
        if (!isSilent) {
          this.notify.removeLoading();
        }
        if(hideError){
          throw err;
        }
        if (err && err.error && err.error.resp && err.error.resp.error) {
          if(err.error.resp.statusCode == 430){
                this.customTokenService.deleteToken();                       
                this.router.navigate(['/auth/login']);            
          }else{
            this.notify.error(err.error.resp.error[0]);
          }          
        } else {
          if (err.name === 'HttpErrorResponse') {
            this.notify.error('Requested service is unavailable at the moment, we regret for the inconvinence caused.')
          } else {
            this.notify.error(err.message);
          }
        }
        throw err;
      })
    );
  }

  public get(path: string,params:any, isSilent: boolean = false, loaderMsg: string = "Loading") {
    if (!isSilent) {
      this.notify.showLoading(loaderMsg);
    }
    return this.httpClient.get(`${ApiService.apiURL}${path}`, { headers: this.headers ,params}).pipe(
      map((response: any) => {
        if (!isSilent) {
          this.notify.removeLoading();
        }
        if (response.resp && response.resp.success) {
          return response.resp.data;
        } else {
          this.notify.error(response.resp.message);
        }
      }),
      catchError(err => {
        console.log(err.error.resp);
        if (!isSilent) {
          this.notify.removeLoading();
        }
        if (err && err.error && err.error.resp && err.error.resp.error) {
          this.notify.error(err.error.resp.error[0]);
        } else {
          if (err.name === 'HttpErrorResponse') {
            this.notify.error('Requested service is unavailable at the moment, we regret for the inconvinence caused.')
          } else {
            this.notify.error(err.message);
          }
        }
        throw err;
      })
    );
  }

  public post(path: string, data: any, isSilent: boolean = false, loaderMsg: string = undefined) {
    if (!isSilent) {
      this.notify.showLoading(loaderMsg);
    }
    return this.httpClient.post(`${ApiService.apiURL}${path}`, data, { headers: this.headers }).pipe(
      map((response: any) => {
        if (!isSilent) {
          this.notify.removeLoading();
        }
        if (response.resp && response.resp.success) {
          return response.resp.data;
        } else {
          this.notify.error(response.resp.message);
        }
      }),
      catchError(err => {
        console.log(err);
        if (!isSilent) {
          this.notify.removeLoading();
        }
        if (err && err.error && err.error.resp && err.error.resp.error) {
          this.notify.error(err.error.resp.error[0]);
        } else {
          if (err.name === 'HttpErrorResponse') {
            this.notify.error('Requested service is unavailable at the moment, we regret for the inconvinence caused.')
          } else {
            this.notify.error(err.message);
          }
        }
        throw err;
      })
    );
  }

  public upload(data) {
    return this.httpClient.post<any>(`${ApiService.apiURL}/upload`, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', progress };
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }
}