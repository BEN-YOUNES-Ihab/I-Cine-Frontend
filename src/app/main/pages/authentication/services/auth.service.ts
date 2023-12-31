import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { CurrentUser } from 'app/main/pages/users/models/user';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//public
public currentUser = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));


constructor(private _http: HttpClient, private router: Router, private coreMenuService: CoreMenuService) {
}

 public get currentUserValue(): CurrentUser {
  return this.currentUser.value;
}

logout() {
  localStorage.clear();
  this.coreMenuService.setCurrentMenu('landing-menu');
  this.currentUser.next(null);
  this.router.navigate(['pages/authentication/login-v2']);
}

login(inputdata: any){
  return this._http.post<any>(environment.apiUrl + 'auth/login' , inputdata);
}

GetAccesToken() {
  return localStorage.getItem("accessToken");
}

}