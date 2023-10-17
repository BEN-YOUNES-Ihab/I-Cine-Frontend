import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from 'app/main/pages/users/services/users.service';
import { Observable } from 'rxjs';
import { AuthService } from 'app/main/pages/authentication/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private route:Router, private userService: UserService, private authService: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.currentUserValue.role =='admin'){
      return true;
    }
    else{
      alert("Vous n'êtes pas autorisé à accéder cette page");
      this.route.navigateByUrl("pages/authentication/login-v2");
    //   this.authService.logout();
      return false;
    }
  }
}