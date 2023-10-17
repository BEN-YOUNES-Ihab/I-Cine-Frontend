import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-login-v2',
  templateUrl: './auth-login-v2.component.html',
  styleUrls: ['./auth-login-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginV2Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private coreConfigService: CoreConfigService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this._unsubscribeAll = new Subject();
    if (localStorage.getItem('accessToken')) {
      localStorage.clear();
      this.authService.currentUser.next(null);
    }
    // Configure the layout
    this.coreConfigService.config = {
      layout: {
        navbar: {
          hidden: false
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

  sucessToastr(message,title) {
    this.toastr.success(message, title, {
      positionClass: 'toast-bottom-left',
      toastClass: 'ngx-toastr myToast',
      closeButton: true
    });
  }
  errorToastr(message,title) {
    this.toastr.error(message, title, {
      positionClass: 'toast-bottom-left',
      toastClass: 'ngx-toastr myToast',
      closeButton: true
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  login(form: FormGroup) {
    this.submitted = true;
    // stop here if form is invalid
    if (form.invalid) {
      return;
    } else {
      this.authService.login(form.value).subscribe(data => {
        if (data) {
          console.log("onjour")
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('currentUser', JSON.stringify(data.currentUser));
          this.authService.currentUser.next(data.currentUser);
          this.sucessToastr("Bienvenue sur la platforme I-Ciné","Bienvenue!")
          this.router.navigate(['/home']);
        } else {
          this.error = "L'identifiant ou le mot de passe est incorrect";
        }
        
      }, (err) => {
        this.error = "Veuillez réessayer ultérieurement."
      });
    }
  }
  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('currentUser'))){
      this.router.navigate(['/home']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Subscribe to config changes
    this.coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
