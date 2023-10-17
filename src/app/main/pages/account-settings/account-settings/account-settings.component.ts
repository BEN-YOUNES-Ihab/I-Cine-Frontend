import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import { UserService } from '../../users/services/users.service';
import { CurrentUser, CurrentUserClass, UserToAdd, UserToEdit } from '../../users/models/user';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../authentication/services/auth.service';
import { ModalsService } from 'app/shared/services/modals.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSettingsComponent implements OnInit {
  public userDetails: CurrentUser;

  // CHANGE PROFILE FORM VARS
  public changeProfilesubmitted = false;
  public error: string = "";

  // CHANGE PASSWORD FORM VARS
  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;
  public passwordSubmitted = false;
  public passError: string = "";
  constructor(    
    private userService: UserService,
    private toastr: ToastrService,
    private authService: AuthService,
    private modalService: ModalsService) { }

  ngOnInit(): void {
      this.userDetails = this.authService.currentUserValue;
    
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
  updateCurrentUserDetails(form: NgForm) {
    this.changeProfilesubmitted = true;
    if (!form.valid) {
      return;
    }

    // PUT USER
    this.modalService.openConfirmationModal("Vous ne pourrez pas revenir en arrière !", "danger", "Changer").then(result => {
      
      let userToEdit = new UserToEdit;
      userToEdit.email = form.value.email;
      userToEdit.firstname = form.value.firstName;
      userToEdit.lastname = form.value.lastName;

      this.userService.editUser(userToEdit, this.userDetails.email).subscribe(data => {
        
      const currentUser = this.authService.currentUserValue;
      currentUser.lastName = form.value.lastName;
      currentUser.firstName = form.value.firstName;
      currentUser.email = form.value.email;
      this.authService.currentUser.next(currentUser);
      localStorage.setItem("currentUser",JSON.stringify(currentUser));
      this.error = "";
      this.sucessToastr('Opération effectuée avec succès', 'Succès');
      }, (err) => {
        console.log(err);
        this.errorToastr('Opération échouée', 'Échec');
      });
    },
    // PROMISE REJECT
    () => {
    });
  }
  updateCurrentUserPassword(form: NgForm) {
    this.passwordSubmitted = true;
    if (!form.valid) {
      return;
    }
    if (form.value.password == form.value.confirm_password) {
      this.modalService.openConfirmationModal("Vous ne pourrez pas revenir en arrière !", "danger", "Changer").then(result => {
        this.userService.putUserPassword(form.value, this.userDetails.email).subscribe((data) => {
          this.passwordSubmitted = false;
          let ref = document.getElementById('_cancel')
          ref?.click();
          this.sucessToastr('Opération effectuée avec succès', 'Succès');
          this.passError = "";
        }, err => {
          this.errorToastr('Opération échouée', 'Échec');
        });
      },
        // PROMISE REJECT
        () => {
        });
    } else {
      this.passError = "Confirmer votre mot de passe."
    }
  }


  togglePasswordTextTypeOld() {
    this.passwordTextTypeOld = !this.passwordTextTypeOld;
  }

  togglePasswordTextTypeNew() {
    this.passwordTextTypeNew = !this.passwordTextTypeNew;
  }

  togglePasswordTextTypeRetype() {
    this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
  }
}
