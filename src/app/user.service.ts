import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiBaseURL = 'http://192.168.9.120:8000/api/'; // this can we get from environment... just here like that because dummy task

export interface User {
  _id: string,
  name: string,
  email: string,
  phone_number: string, // because user can also put dash or plus symbols, alternatively we can validate
  date_of_birth: string,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  get():  Observable<User[]> {
    return this.http.get<User[]>(apiBaseURL + 'user');
  }
}
