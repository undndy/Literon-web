import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author} from 'src/app/models/Author';
import {map} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8'// 'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  constructor(private http: HttpClient) { }

  // getAuthors(): Observable<Author[]> {
  //   return this.http.get<GetModelAll>(`api/authors`).pipe(map(response => response._embedded.authors));
  // }

  getAuthors(): Observable<any>{
    return this.http.get(`api/authors/all`)
  }

  getAuthorById(id: number): Observable<any> {
    // console.log('api/authors/' + id)
    return this.http.get(`api/authors/` + id);
  }

  create(author: any): Observable<any>{
    return this.http.post<Author>(`api/authors/create`, author)
  }

  // getAuthorByName(search: string[]): Observable<Author[]>{
  //   return this.http.get<GetModelPoem>(`api/search/${search}`).pipe(map(response => response._embedded.poems));
  // }
  //
  // getPoemById(poemId: number): Observable<Poem> {
  //   return this.http.get<Poem>(`${environment.baseUrl}/poems/${poemId}`);
  // }
  //
  // createTask(poemId: number, question: string, answer: string): Observable<any> {
  //   return this.http.post(`${environment.baseUrl}/poems/${poemId}/tasks`, { question, answer });
  // }
}
