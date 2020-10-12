import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service'
import { CustomTokenService } from './customtoken.service'



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notify:NotificationService,private token:CustomTokenService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
            request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.token.getToken()}`
                }
              });
      return next.handle(request).pipe(
            catchError(err => {
            return throwError(err);
        }))
    }
}