import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "../models/Question";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8'// 'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(private http: HttpClient) { }

  getTasksById(taskId: number): Observable<any>{
    return this.http.get(`api/question` + taskId)
  }

  createQuestions(question: Question): Observable<any>{
    return this.http.post(`api/question/create`, question)
  }
}
