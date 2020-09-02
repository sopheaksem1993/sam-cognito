import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Constants} from "@configs/constant";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string = Constants.baseUrl.dev;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  create(url, data): Observable<any> {
    let API_URL = `${this.baseUrl + url}`;
    return this.http.post(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.error)
      )
  }

  // Read
  read(url) {
    return this.http.get(`${this.baseUrl + url}`);
  }

  // Update
  update(url, data): Observable<any> {
    let API_URL = `${this.baseUrl + url}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.error)
    )
  }

  // Delete
  delete(url): Observable<any> {
    let API_URL = `${this.baseUrl + url}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.error)
    )
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
