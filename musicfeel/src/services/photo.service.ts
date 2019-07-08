import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  
  FileUploadAPIEndpoint = environment.FileUploadCRUDAPIEndPoint;
  RekognitionAPIEndpoint = environment.RekognitionCRUDAPIEndPoint;
  //apiURL: string = 'http://localhost:3000/';
	httpOptions: any;
  constructor(private httpClient: HttpClient) { }

  public upload(photo: File)
  {
    console.log("Photo: " + photo);
    var formData = new FormData();
    formData.append('image', photo, photo.name);
    console.log("FormData get: " + formData.has("image"));
    /* for (var pair of formData.()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  } */
    console.log("Nombre del archivo: " + photo.name)
    return this.httpClient.post(this.FileUploadAPIEndpoint + 'file-upload', formData)
    .pipe( catchError(this.handleError));
  }

  public rekognition(photo_id)
  {
    return this.httpClient.post(this.RekognitionAPIEndpoint + 'rekognition', { name : photo_id })
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
