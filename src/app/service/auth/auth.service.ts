import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author} from 'src/app/models/Author';
import {map} from "rxjs/operators";
import {User} from "../../models/User";

const AUTH_API = 'http://localhost:8080/api/auth'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8'// 'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private http: HttpClient) { }

  public login(user: any): Observable<any>{
    return this.http.post(AUTH_API + `/signin`,{
      email: user.email,
      password: user.password
    });
  }

  public register(user: User): Observable<any>{
    return this.http.post(AUTH_API + `/signup`, {
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      confirmPassword: user.confirmPassword,
    })
  }
}
