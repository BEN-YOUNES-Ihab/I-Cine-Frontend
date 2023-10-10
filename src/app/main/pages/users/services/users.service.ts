import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { UserToAdd } from '../models/user';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  tokenresp: any;

  constructor(private http: HttpClient, private router: Router) { }
 

  addUser(user: UserToAdd) {
    return this.http.post(environment.apiUrl + 'auth/signUp', user);
  }
  GetRole() {
    return localStorage.getItem("role") || '';
  }

}
