import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import {
  SwiperOptions,
} from 'swiper';
import { register } from 'swiper/element/bundle';
import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-home',
  templateUrl: './movies-home.component.html',
  styleUrls: ['./movies-home.component.scss']
})
export class MoviesHomeComponent implements OnInit, AfterViewInit {

  public toDisplayMovieList = [];
  public beforePremiereMovies = [];
  public onDisplayMovies = []

  public config: SwiperOptions = {};
  public swiperToDisplayElements = 6;
  public swiperBeforePremiereElements = 6;

  constructor(
    private coreConfigService: CoreConfigService,
    private moviesService: MoviesService,
    private router: Router) { 
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

  ngAfterViewInit(): void {
    register();
  }

  ngOnInit(): void {
    this.getMoviesToDisplay();
  }

  getMoviesToDisplay(){
    this.moviesService.getMoviesToDisplay().subscribe(
      (data: any) => { 
        if (data) {
          this.toDisplayMovieList = data.toDisplayMovies;
          this.beforePremiereMovies = data.beforePremiereMovies;
          this.onDisplayMovies = data.onDisplayMovies;
        }
       
      },
      (error) => console.log(error)
    );
  }
  redirectToSession(id){
    this.router.navigate([`pages/${id}/sessions-list`]);
  }
  getNewBadge(releaseDate) {
    if (!releaseDate) {
      return false;
    }
  
    let todayTime = new Date().getTime();
    let releaseDateTime = new Date(releaseDate).getTime();
    let timeDifference = todayTime - releaseDateTime;
    const twoWeeksInMilliseconds = 2 * 7 * 24 * 60 * 60 * 1000;
    
    if (timeDifference < twoWeeksInMilliseconds && releaseDateTime < todayTime) {
      return true;
    } else {
      return false;
    }
  }
  getBeforePremiereBadge(releaseDate) {
    if (!releaseDate) {
      return false;
    }
  
    let todayTime = new Date().getTime();
    let releaseDateTime = new Date(releaseDate).getTime();
    
    
    if (todayTime < releaseDateTime) {
      return true;
    } else {
      return false;
    }
  }
}
