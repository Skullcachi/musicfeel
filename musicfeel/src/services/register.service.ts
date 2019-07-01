import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiURL: string = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { }

  public createUser(username:string, password:string, name:string)
  {
    return this.httpClient.post(`${this.apiURL}add/`,
    {
      username : username,
      password : password,
      name : name
    });
  }
}
