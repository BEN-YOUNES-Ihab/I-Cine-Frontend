import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../services/sessions.service';
import { ActivatedRoute } from '@angular/router';
import { MovieToEdit } from '../../movies/models/movie';
import { MoviesService } from '../../movies/services/movies.service';
import { CoreConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.scss']
})
export class SessionsListComponent implements OnInit {
  public sessionsList;
  public selectedSession;
  public movieId;
  public date;
  public currentMovie : MovieToEdit;

  public contentHeader: object;
  dates:string[] = [];
  selectedDate: string | null = null;


  constructor(
    private coreConfigService : CoreConfigService,
    private sessionsService : SessionsService, 
    private route : ActivatedRoute,
    private moviesService : MoviesService) {
      
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
    // Obtenir la date d'aujourd'hui
    const today = new Date();
  
    // Initialisez la liste des dates avec les 7 prochains jours
    this.dates = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const formattedDate = nextDate.toISOString().split('T')[0];
      this.dates.push(formattedDate);
    }
    
    
  }
  

  selectDate(date: string) {
    this.selectedDate = date;
    // Vous pouvez ajouter d'autres actions à effectuer lors de la sélection d'une date ici
  }

  heures = ["14h30", "17h30", "19h30", "21h45", "22h50"];


  datesArray = Object.keys(this.heures);

  heureSelectionnee: string = '';

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.date = new Date();
    this.getMovie();
    this.getSessionsList();
  }

  getSessionsList() {
    const queryParams = {
      Date:this.date,
      movieId: this.movieId,

    };

    this.sessionsService.getSessionsByMovieIdUser(queryParams).subscribe(
      (data: any) => { 
        if (data) {
          console.log(data);
          this.sessionsList = data;
        }
      },
      (error) => console.log(error)
    );
  }
  getMovie(){
    this.moviesService.getMovie(this.movieId).subscribe(data=>{
      this.currentMovie = data as MovieToEdit;
    })
  }
}
