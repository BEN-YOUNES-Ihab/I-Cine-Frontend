import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsService } from 'app/shared/services/modals.service';
import { French } from 'flatpickr/dist/l10n/fr';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { ToastrService } from 'ngx-toastr';
import { SessionsService } from '../services/sessions.service';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { SessionToEdit } from '../models/session';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieToEdit } from '../../movies/models/movie';
import { MoviesService } from '../../movies/services/movies.service';

@Component({
  selector: 'app-sessions-admin',
  templateUrl: './sessions-admin.component.html',
  styleUrls: ['./sessions-admin.component.scss']
})
export class SessionsAdminComponent implements OnInit {

  public showAdd !: boolean;
  public showUpdate !: boolean;
  public sessionSubmitted = false;
  public error :string ="";

  public selectedSession = new SessionToEdit;
  public sessionsList : SessionToEdit[];
  public movieId : string;
  public currentMovie : MovieToEdit;
  
  public keyword = "";
  public page: number = 1;
  public size: number = 5;
  public totalElements: number = 0;
  public totalPages: number = 0;

  public basicDateOptions: FlatpickrOptions = {
    altInput: true,
    enableTime: true,
    "locale": French
  }
  public DateRangeOptions: FlatpickrOptions = {
    altInput: true,
    mode: 'range',
    "locale": French
  }
  private today = new Date();

  contentHeader: ContentHeader ;
  constructor(
    private sessionsService : SessionsService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private modalsService : ModalsService,
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.movieId =  this.route.snapshot.paramMap.get('id');
    this.moviesService.getMovie(this.movieId).subscribe(data =>{
      this.currentMovie = data as MovieToEdit;
      this.contentHeader = {
        headerTitle: this.currentMovie.title,
        actionButton: false,
        breadcrumb: {
          type: '',
          links: [
            {
              name: 'Gestionnaire de films',
              isLink: true,
              link: '/pages/movies-admin'
            },
            {
              name: 'Gestionnaire de séances',
              isLink: false
            }
          ]
        }
      }
    })
    
    
    this.getSessionsList();
  }

  getSessionsList() {
    const queryParams = {
      minDate:"",
      maxDate:"",
      movieId: this.movieId,
      page: this.page.toString(),
      size: this.size.toString(),
    };
    if(this.keyword != ""){
      queryParams.minDate = this.keyword[0];
      queryParams.maxDate = this.keyword[1];
    }
    if( queryParams.minDate!=undefined && queryParams.maxDate==undefined ){
      return
    }
    this.sessionsService.getSessionsList(queryParams).subscribe(
      (data: any) => { 
        if (data) {
          console.log(data);
          this.sessionsList = data.content;
          this.totalElements = data.totalElements;
          this.totalPages = data.totalPages;
        }
      },
      (error) => console.log(error)
    );
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getSessionsList();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getSessionsList();
    }
  }
  update(){
    this.page = 1;
    this.getSessionsList();
  }

  clickEditSession(session: SessionToEdit ,modalBasic){
    this.sessionSubmitted = false;
    this.selectedSession = session;
    this.basicDateOptions.defaultDate = this.selectedSession.date;
    this.showAdd = false;
    this.showUpdate = true;
    this.modalService.open(modalBasic, {
      windowClass: 'modal'
    });
    
  }
  clickAddSession(modalBasic){
    this.selectedSession = new SessionToEdit;
    this.sessionSubmitted = false;
    this.selectedSession.movieId = +this.movieId;
    this.basicDateOptions.defaultDate = this.today;
    this.selectedSession.date = this.today;
    this.showAdd = true;
    this.showUpdate = false
    this.modalService.open(modalBasic, {
      windowClass: 'modal'
    });
    ;
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
  createSession(){
    this.sessionSubmitted = true;

    this.sessionsService.createSession(this.selectedSession).subscribe(data => {
      this.update();
      this.sucessToastr('Opération éffectuée', 'Succès');
      this.modalService.dismissAll();
      this.error = "";
    }, (err) => {
      console.log(err);
      this.error = "Opération échouée"
    });
  }

  updateSessionDetails(){
    this.sessionSubmitted = true;
    this.sessionsService.updateSession(this.selectedSession.id, this.selectedSession).subscribe(data => {
      this.update();
      this.sucessToastr('Opération éffectuée', 'Succès');
      this.modalService.dismissAll();
      this.error = "";
    }, (err) => {
      console.log(err);
      this.error = "Opération échouée"
    });
  }

  deleteSession(id: string){
    this.modalsService.openConfirmationModal('Voulez-vous vraiment supprimer cet film ?', 'danger', 'Supprimer').then(result => {
      if (result) {
        this.sessionsService.deleteSession(id).subscribe(data => {
          if (data) {
            // const index = this.moviesList.findIndex(x => x.id == id);
            // this.moviesList.splice(index, 1);
            // this.totalElements = this.totalElements - 1;
            this.update();
            this.sucessToastr('Opération éffectuée', 'Succès');
          }
        }, (err) => {
          this.errorToastr('Opération écchouée', 'Échec');
        });
      }
    }, () => { })
  }

  redirectToOrders(id){
    this.router.navigate([`/pages/${id}/orders-admin`]);
  }

}
