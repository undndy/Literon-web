import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {TokenStorageService} from "./token-storage.service";

const USER_API = 'http://localhost:8080/api/user/'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private token: TokenStorageService) { }

  getUserById(id: number): Observable<any>{
    return this.http.get(USER_API+id);
  }

  getCurrentUser(): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `${this.token.getToken()}`);
    return this.http.get(`api/user/`, { headers });
  }

}
