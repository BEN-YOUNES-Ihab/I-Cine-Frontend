import { Component, OnInit } from '@angular/core';
import { MovieToEdit } from '../models/movie';
import { MoviesService } from '../services/movies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { French } from "flatpickr/dist/l10n/fr.js"
import { ModalsService } from 'app/shared/services/modals.service';
import { Router } from '@angular/router';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { CoreConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-movies-admin',
  templateUrl: './movies-admin.component.html',
  styleUrls: ['./movies-admin.component.scss']
})
export class MoviesAdminComponent implements OnInit {
  public showAdd !: boolean;
  public showUpdate !: boolean;
  public movieSubmitted = false;
  public error :string ="";

  public selectedMovie = new MovieToEdit;
  public moviesList : MovieToEdit[];

  public keyword = "";
  public page: number = 1;
  public size: number = 5;
  public totalElements: number = 0;
  public totalPages: number = 0;

  public selectedImg: File;
  public selectedImgPath : String | ArrayBuffer;

  public selectedSecondImg: File;
  public selectedSecondImgPath : String | ArrayBuffer;

  public categorysList = ["Test1", "Test2", "Test3" , "Test4"];
  
  public basicDateOptions: FlatpickrOptions = {
    altInput: true,
    "locale": French,
  }
  private today = new Date();

  contentHeader : ContentHeader  = {
    headerTitle: "Gestionnaire de films",
    actionButton: false,
    breadcrumb: {
      type: ''
    }
  }
  constructor(
    private coreConfigService : CoreConfigService,
    private moviesService : MoviesService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private modalsService : ModalsService,
    private router : Router
  ) { 
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
        }
      }
    };
  }

  ngOnInit() {
    this.getMoviesList();
  }

  getMoviesList() {
    const queryParams = {
      keyword: this.keyword,
      page: this.page.toString(),
      size: this.size.toString(),
    };
    this.moviesService.getMoviesList(queryParams).subscribe(
      (data: any) => { 
        if (data) {
          this.moviesList = data.content;
          this.totalElements = data.totalElements;
          this.totalPages = data.totalPages;
        }
      },
      (error) => console.log(error)
    );
  }

  clickEditMovie(movie: MovieToEdit ,modalBasic){
    this.movieSubmitted = false;
    this.selectedMovie = movie;
    this.selectedSecondImgPath = movie.baniereImageUrl;
    this.selectedImgPath = movie.imageUrl;
    this.basicDateOptions.defaultDate = this.selectedMovie.releaseDate;
    this.showAdd = false;
    this.showUpdate = true;
    this.modalService.open(modalBasic, {
      windowClass: 'modal',
      centered:true,
      size:'lg'
    });
    
  }
  clickAddMovie(modalBasic){
    this.selectedMovie = new MovieToEdit;
    this.movieSubmitted = false;
    this.selectedImgPath = null;
    this.selectedSecondImgPath = null;
    this.basicDateOptions.defaultDate = this.today;
    this.selectedMovie.onDisplay = false;
    this.selectedMovie.releaseDate = this.today;
    this.showAdd = true;
    this.showUpdate = false
    this.modalService.open(modalBasic, {
      windowClass: 'modal',
      centered:true,
      size:'lg'
    });
    ;
  }

  errorToastr(message,title) {
    this.toastr.error(message, title, {
      positionClass: 'toast-bottom-left',
      closeButton: true
    });
  }
  sucessToastr(message,title) {
    this.toastr.success(message, title, {
      positionClass: 'toast-bottom-left',
      closeButton: true
    });
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getMoviesList();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getMoviesList();
    }
  }
  update(){
    this.page = 1;
    this.getMoviesList();
  }

  onLogoSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedImg = file;
      const reader = new FileReader();
      reader.onload = e => this.selectedImgPath = reader.result;
      reader.readAsDataURL(file);
    }
    console.log()
  }
  onBaniereImageSelected(event: any){
    console.log('hi')
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedSecondImg = file;
      const reader = new FileReader();
      reader.onload = e => this.selectedSecondImgPath = reader.result;
      reader.readAsDataURL(file);
    }
    console.log(this.selectedImgPath)
    console.log(this.selectedSecondImgPath);
  }

  updateMovieDetails(){
    this.movieSubmitted = true;
    const formData = new FormData();

    formData.append('file', this.selectedImg);
    formData.append('secondFile', this.selectedSecondImg);
    this.moviesService.updateMovie(this.selectedMovie.id, this.selectedMovie).subscribe(data => {
      this.moviesService.updateMovieImage(this.selectedMovie.id, formData).subscribe(data=>{
        this.getMoviesList();
      });
      this.sucessToastr('Opération éffectuée', 'Succès');
      this.modalService.dismissAll();
      this.error = "";
    }, (err) => {
      console.log(err);
      this.error = "Opération échouée"
    });
  }

  createMovie(){
    this.movieSubmitted = true;
    if(!this.selectedImg || !this.selectedSecondImg){
      this.error= "Ajouter deux images !"
      return
    }
    const formData = new FormData();
    formData.append('file', this.selectedImg);
    formData.append('secondFile', this.selectedSecondImg);
    this.moviesService.createMovie(this.selectedMovie).subscribe(data => {
      const tempMovie = data as MovieToEdit;
      this.moviesService.updateMovieImage(tempMovie.id, formData).subscribe(data=>{
        this.getMoviesList();
      });
      this.getMoviesList();
      this.sucessToastr('Opération éffectuée', 'Succès');
      this.modalService.dismissAll();
      this.error = "";
    }, (err) => {
      console.log(err);
      this.error = "Opération échouée"
    });
  }

  deleteMovie(id: string){
    this.modalsService.openConfirmationModal('Voulez-vous vraiment supprimer cet film ?', 'danger', 'Supprimer').then(result => {
      if (result) {
        this.moviesService.deleteMovie(id).subscribe(data => {
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

  clickSendToSessionPage(movie : MovieToEdit){
    this.router.navigate([`/pages/${movie.id}/sessions-admin`]);
  }
}
