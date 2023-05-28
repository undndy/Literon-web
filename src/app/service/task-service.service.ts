import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../models/Task";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8'// 'application/json',
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http: HttpClient) { }

  getTasksByPoem(poemId: number, userId: number): Observable<any>{
    return this.http.get(`api/tasks/` + poemId + `/` + userId)
  }

  createTasks(task: any, poemId: number, userId: number): Observable<any>{
    return this.http.post(`api/tasks/create/` + poemId + `/` + userId, task)
  }


  getTasksForCurrentUser(): Observable<any>{
    return this.http.get(`api/tasks/user`)
  }
}
