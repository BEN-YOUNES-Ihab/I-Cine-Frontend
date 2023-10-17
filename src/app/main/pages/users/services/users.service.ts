import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { UserToAdd, UserToEdit, UserToEditRole } from '../models/user';
import { environment } from 'environments/environment';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  tokenresp: any;

  constructor(private http: HttpClient, private router: Router) { }
 

  addUser(user: UserToAdd) {
    return this.http.post(environment.apiUrl + 'auth/signUp', user);
  }

  getUserToEdit(user_id: string) {
    return this.http.get(environment.apiUrl + `users/${user_id}/getUserToEdit`);
  }
  editUser(user: UserToEdit, email:string) {
    return this.http.patch<any>(environment.apiUrl + `users/${email}/editUser`, user);
  }

  putUserPassword(form: Form, email:string) {
    return this.http.patch(environment.apiUrl + `users/${email}/editUserPassword`, form);  
  }

  editUserRole(user:UserToEditRole, email:string ) {
    return this.http.patch<any>(environment.apiUrl + `users/${email}/editUserRole`, user);
  }

  getUsersList(queryParams: any){
    return this.http.get(environment.apiUrl + 'users/getUsersList', { params: queryParams });  
  }

  deleteUser(email:string){
    return this.http.delete(environment.apiUrl + `users/${email}/deleteUser`);
  }
}
