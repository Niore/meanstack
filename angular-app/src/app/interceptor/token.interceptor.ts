import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
      private authService: AuthService
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET') {
        console.log(this.authService.loadToken());
        const newRequest = request.clone({
            headers: request.headers.set('Authorization', `${this.authService.loadToken()}`),
        });
        return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
