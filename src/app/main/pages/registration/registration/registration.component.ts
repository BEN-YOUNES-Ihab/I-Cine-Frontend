import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../../users/services/users.service';
import { AuthService } from '../../authentication/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {
  public coreConfig: any;
  public passwordTextType: boolean;
  public repeatpasswordTextType: boolean;
  public error: string ="";
  public loading = false;

  
  private _unsubscribeAll: Subject<any>;

  constructor(    
    private _coreConfigService: CoreConfigService,
    private _activatedroute: ActivatedRoute,
    private _router: Router,
    private userService: UserService,
    private authService: AuthService
    ) { 
      this._unsubscribeAll = new Subject();
      // Configure the layout
      this._coreConfigService.config = {
        layout: {
          navbar: {
            hidden: true
          },
          menu: {
            hidden: true
          },
          footer: {
            hidden: true
          },
          customizer: false,
          enableLocalStorage: false
        }
      };
    }


  ngOnInit(): void {
            // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });

    if(JSON.parse(localStorage.getItem('currentUser'))){
      this._router.navigate(['/home']);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  signUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.passwordIsValid(form.value.password, form.value.confirm_password)) {
      if(form.value.password.length < 8 || form.value.password.length > 30){
        this.error ="Votre mot de passe doit contenir entre 8 et 30 caractères"
        return
      }

      this.userService.addUser(form.value).subscribe(
        (res) => {
          this.loading = true;
          setTimeout(() => {
            this._router.navigate(['/pages/authentication/login-v2']);
          }, 1000);
        },
        (err) => {
          if (err.error.statusCode === 409) {
            this.error = "L'email existe déjà";
          } else {
            this.error = "Erreur";
            console.error(err);
          }
        }
      );
    } else {
      this.error = "Les mots de passe ne sont pas identiques";
    }
  }

  passwordIsValid(password :any, confirm_password : any): boolean {
    if(password==confirm_password){
      return true;
    }else{
      return false;
    }
  }
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  toggleRepeatPasswordTextType() {
    this.repeatpasswordTextType = !this.repeatpasswordTextType;
  }
}
