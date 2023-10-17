import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { UserService } from '../services/users.service';
import { UserToEditRole } from '../models/user';
import { ModalsService } from 'app/shared/services/modals.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  public showAdd !: boolean;
  public showUpdate !: boolean;
  public userSubmitted = false;
  selectedUser = new UserToEditRole;
  

  public usersList : UserToEditRole[];
  public keyword = "";
  public page: number = 1;
  public size: number = 5;
  public totalElements: number = 0;
  public totalPages: number = 0;

  constructor(
    private userService : UserService,
    private modalService: NgbModal,
    private modalsService : ModalsService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList() {
    const queryParams = {
      keyword: this.keyword,
      page: this.page.toString(),
      size: this.size.toString(),
    };
    console.log(this.keyword);
    this.userService.getUsersList(queryParams).subscribe(
      (data: any) => { // Use 'any' to allow any response shape
        console.log(data);
        if (data) {
          this.usersList = data.content;
          this.totalElements = data.totalElements;
          this.totalPages = data.totalPages;
        }
      },
      (error) => console.log(error)
    );
  }
  

  clickEditUser(user: UserToEditRole ,modalBasic){
    this.userSubmitted = false;
    this.selectedUser = user;
    this.showAdd = false;
    this.showUpdate = true;
    this.modalService.open(modalBasic, {
      windowClass: 'modal'
    });
    
  }
  errorToastr(message,title) {
    this.toastr.error(message, title, {
      positionClass: 'toast-bottom-left',
      toastClass: 'ngx-toastr myToast',
      closeButton: true
    });
  }
  sucessToastr(message,title) {
    this.toastr.success(message, title, {
      positionClass: 'toast-bottom-left',
      toastClass: 'ngx-toastr myToast',
      closeButton: true
    });
  }
  deleteUser(email: string){
    this.modalsService.openConfirmationModal('Voulez-vous vraiment supprimer cet utilisateur ?', 'danger', 'Supprimer').then(result => {
      if (result) {
        this.userService.deleteUser(email).subscribe(data => {
          if (data) {
            this.update();
            this.sucessToastr('Opération éffectuée', 'Succès');
          }
        }, (err) => {
          this.errorToastr('Opération écchouée', 'Échec');
        });
      }
    }, () => { })
  }

  updateUser(form: NgForm){
    this.userSubmitted = true;
    if(form.invalid){
      return;
    }
    this.userService.editUserAdmin(this.selectedUser).subscribe(res=>{
      this.userSubmitted = false;
      this.sucessToastr('Opération éffectuée', 'Succès');
      this.getUsersList();
      this.modalService.dismissAll();
    },err=>{
      this.errorToastr('Opération écchouée', 'Échec');
    });
  }

  nextPage() {
    console.log(this.page)
    console.log(this.totalPages - 1)
    if (this.page < this.totalPages) {
      this.page++;
      this.getUsersList();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getUsersList();
    }
  }
  update(){
    this.page = 1;
    this.getUsersList();
  }
}
