import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../services/sessions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieToDisplay, MovieToEdit } from '../../movies/models/movie';
import { MoviesService } from '../../movies/services/movies.service';
import { CoreConfigService } from '@core/services/config.service';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';
import { SessionToEdit } from '../models/session';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.scss']
})
export class SessionsListComponent implements OnInit {
  public basicDateOptions: FlatpickrOptions = {
    "locale": French,
    altInput: true
  }

  public sessionsList;
  public selectedSession;
  public movieId;
  public date;
  public currentMovie : MovieToDisplay;
  public sessionsDateToEnable = [] ;
  public contentHeader: object;
  nextSevenDays:string[] = [];


  constructor(
    private modalService : NgbModal,
    private coreConfigService : CoreConfigService,
    private sessionsService : SessionsService, 
    private route : ActivatedRoute,
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
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.getMovieWithSessions();
  }

  clickTime(session: SessionToEdit ,modalBasic){
    this.selectedSession = session;
    this.modalService.open(modalBasic, {
      windowClass: 'modal'
    });
    
  }
  
  getSessionsList() {
    const queryParams = {
      date:this.date,
      movieId: this.movieId,

    };

    this.sessionsService.getSessionsByMovieIdUser(queryParams).subscribe(
      (data: any) => { 
        if (data) {
          this.sessionsList = data;
        }
      },
      (error) => console.log(error)
    );
  }

  getDatesToEnable(){
    if(this.currentMovie.sessions.length>0){
      this.currentMovie.sessions.forEach(e =>{
        let date = new Date(e.date);
        let today = new Date();
        if(date > today && e.remaningPlaces>0){
          this.sessionsDateToEnable.push(e.date);
        }
      })
      let length = this.sessionsDateToEnable.length;
      
      this.date = new Date (this.sessionsDateToEnable[length-1]);
      this.basicDateOptions.enable = this.sessionsDateToEnable;
      if(this.sessionsDateToEnable.length>0){
        this.getSessionsList();
      }
    }
    
  }
   convertMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes;
  
    return `${formattedHours}h${formattedMinutes}`;
  }
   addMinutesToDate(date, minutesToAdd:number) {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + minutesToAdd);
  
    return newDate;
  }
  
  getMovieWithSessions(){
    this.moviesService.getMovieWithSessions(this.movieId).subscribe(data=>{
      this.currentMovie = data as MovieToDisplay;
      this.getDatesToEnable();
    })
  }

  redirectOrder(sessionId){
    this.modalService.dismissAll();
    this.router.navigate([`/pages/${sessionId}/order`])
  }
}



