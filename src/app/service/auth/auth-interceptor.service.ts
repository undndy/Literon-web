import {FactoryProvider, Injectable, Provider} from '@angular/core';
import {TokenStorageService} from "../token-storage.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from "@angular/common/http";
import {Observable} from "rxjs";
import {ErrorInterceptorService} from "./error-interceptor.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private tokenService: TokenStorageService) { }

  interceptor(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let authRequest = request;
    // const token = this.tokenService.getToken();
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2IiwiZmlyc3ROYW1lIjpudWxsLCJsYXN0TmFtZSI6bnVsbCwiaWQiOiI2IiwiaWF0IjoxNjg0NzEyMzQ5LCJleHAiOjE2ODUzMTIzNDl9.2o0vlWHAVnX5B6D8CGlYJr4md69sbzGiI7U7QhOLwJPlR-D6JL3dQc2OkOuMO095JKexpxFxRQL5Auet0bxEAw';
    if(token != null){
      authRequest = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, token)})
    }
    return next.handle(authRequest);
  }
}

export const authInterceptorProviders = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true,
};
