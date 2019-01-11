import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'POST') {
        const newRequest = request.clone({
            headers: request.headers.set('Content-Type', 'application/json'),
        });
        return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
