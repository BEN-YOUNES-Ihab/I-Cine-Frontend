import { Component, OnInit } from '@angular/core';
import { MovieToEdit } from '../models/movie';
import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  public selectedMovie = new MovieToEdit;
  public moviesList : MovieToEdit[];
  public onDisplayMoviesList :MovieToEdit[];
  // public categorysList: string[] = [
  //   "Action",
  //   "Comédie",
  //   "Drame",
  //   "Science-fiction",
  //   "Horreur",
  //   "Aventure",
  //   "Animation",
  //   "Fantaisie",
  //   "Romance",
  //   "Documentaire"
  // ];

    public categorysList: string[] = [
    "Test1",
    "Test2",
    "Test3",
    "Test4"
  ];

  public title = "";
  public category;
  public page: number = 1;
  public size: number = 24;
  public totalElements: number = 0;
  public totalPages: number = 0;

  public pageBasicText = 1;
  constructor(
    private coreConfigService : CoreConfigService,
    private moviesService : MoviesService,
    private router : Router) { 
      this.coreConfigService.config = {
        layout: {
          navbar: {
            hidden: false
          },
          menu: {
            hidden: true
          },
          footer: {
            hidden: false
          }
        }
      };
    }

  ngOnInit(): void {
    let category;
    if(!this.category){
      category ="";
    }else{
      category= this.category;
    }
    const queryParams = {
      category: category,
      title: this.title,
      page: this.page.toString(),
      size: this.size.toString(),
    };
    this.moviesService.getMoviesListbyCategory(queryParams).subscribe(
      (data: any) => { 
        if (data) {
          this.moviesList = data.content;
          this.onDisplayMoviesList = this.getDisplayedMovies(this.moviesList);
          console.log(this.onDisplayMoviesList)
          this.totalElements = data.totalElements;
          this.totalPages = data.totalPages;
        }
      },
      (error) => console.log(error)
    );
  }

  getMoviesListbyCategory(event?) {
    if(event){
      this.page = event;
    }
    let category;
    if(!this.category){
      category ="";
    }else{
      category= this.category;
    }
    const queryParams = {
      category: category,
      title: this.title,
      page: this.page.toString(),
      size: this.size.toString(),
    };
    this.moviesService.getMoviesListbyCategory(queryParams).subscribe(
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

  getNewBadge(releaseDate) {
    if (!releaseDate) {
      return false;
    }
  
    let todayTime = new Date().getTime();
    let releaseDateTime = new Date(releaseDate).getTime();
    let timeDifference = todayTime - releaseDateTime;
    const twoWeeksInMilliseconds = 2 * 7 * 24 * 60 * 60 * 1000;
    
    if (timeDifference < twoWeeksInMilliseconds) {
      return true;
    } else {
      return false;
    }
  }

  update(){
    this.page = 1;
    this.getMoviesListbyCategory();
  }

  
  getDisplayedMovies(moviesList) {
    return moviesList.filter(film => film.onDisplay === true);
  }
  redirectToSession(id){
    this.router.navigate([`pages/${id}/sessions-list`]);
  }
}
