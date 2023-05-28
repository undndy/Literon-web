import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChronographServiceService {

  constructor(private http: HttpClient) { }

  getChrono(authorId: number): Observable<any>{
    return this.http.get(`api/chrono/` + authorId + `/chronograph`);
  }
}
