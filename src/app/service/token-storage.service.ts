import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public saveToken(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(){
    // console.log('token: ', sessionStorage.getItem(TOKEN_KEY));
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(){
    return JSON.parse(<string>sessionStorage.getItem(USER_KEY));
  }

  logOut(): void{
    window.sessionStorage.clear();
    window.location.reload();
  }
}
