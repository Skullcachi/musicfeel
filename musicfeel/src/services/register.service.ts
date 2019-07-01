import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiURL: string = 'http://localhost:3000/';
	httpOptions: any;
  constructor(private httpClient: HttpClient) { }

  public createUser(username:string, password:string, name:string)
  {
    this.httpOptions = {
			headers: new HttpHeaders({
			'Accept':  'application/json',
			'Content-Type': 'application/json'
			})
		};
    console.log("Usuario: " + username)
    console.log("Password: " + password)
    console.log("Name: " + name)
    return this.httpClient.post(this.apiURL + 'add/',
    {
      username : username,
      name : name,
      password : password
    }, this.httpOptions)
    .pipe( catchError(this.handleError));
  }
  
  private handleError(error: HttpErrorResponse) 
  {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error.error);
  };
}

