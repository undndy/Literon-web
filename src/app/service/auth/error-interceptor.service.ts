import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {TokenStorageService} from "../token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private tokenService: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err) => {
      if(err.status === 401){
        this.tokenService.logOut();
        window.location.reload();
      }

      const error = err.error.message || err.statusText;
      return throwError(error)
    }));
  }
}

export const provideErrorInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true,
};
