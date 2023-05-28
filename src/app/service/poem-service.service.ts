import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Poem} from "../models/Poem";
import {map, tap} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8'// 'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class PoemServiceService {

  constructor(private http: HttpClient) { }

  getPoemsByAuthor(authorId: number): Observable<any>{
    return this.http.get(`api/poems/authors/`+ authorId +`/poems`);
  }

  getPoemsById(id: number): Observable<any>{
    return this.http.get(`api/poems/`+ id);
  }


  getPoems(): Observable<Poem[]>{
    return this.http.get<Poem[]>(`api/poems/all`);
  }

  createPoems(poem: any): Observable<any>{
    return this.http.post<Poem>(`api/poems/create`, poem)
  }
}
