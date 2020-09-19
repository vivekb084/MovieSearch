import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  public getData(url:string,data={}): Observable<any> {
    return this.http.get(url,data).pipe(
      catchError(this.handleError),
    );
  }

  public postData(url:string,data={}): Observable<any> {
    return this.http.post(url,data).pipe(
      catchError(this.handleError),
    );
  }

  public handleError(error: HttpErrorResponse){
    console.log("Error found ",error);
    return throwError(error);
  }

}
