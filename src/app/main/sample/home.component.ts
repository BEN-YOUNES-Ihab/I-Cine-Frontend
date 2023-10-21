import { Component, OnInit, ViewChild } from '@angular/core'
import { SessionsService } from '../pages/sessions/services/sessions.service';
import { ActivatedRoute } from '@angular/router';
import { MovieToEdit } from '../pages/movies/models/movie';
import { MoviesService } from '../pages/movies/services/movies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
https: any;
  public movieId : string;
  public page: number = 1;
  public keyword = "";
  public size: number = 5;
  public totalElements: number = 0;
  public totalPages: number = 0;
  public moviesList : MovieToEdit[];
  public selectedFilm: any;

  public contentHeader: object
 


  constructor(
    private moviesService: MoviesService,
    private modalService: NgbModal) {
  }
  /**
   * On init
   */
  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Sample',
            isLink: false
          }
        ]
      }
    }
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
  getDisplayedMovies() {
    return this.moviesList.filter(film => film.onDisplay === true);
  }


  
}
