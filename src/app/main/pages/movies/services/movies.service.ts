import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MovieToEdit } from '../models/movie';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }
 

  createMovie(movie: MovieToEdit) {
    return this.http.post(environment.apiUrl + 'movies/createMovie', movie);
  }

  updateMovie(id:string, movie:MovieToEdit) {
    return this.http.patch<any>(environment.apiUrl + `movies/${id}/updateMovie`, movie);
  }
  
  updateMovieImage(id:string, formData: FormData) {
    return this.http.post<any>(environment.apiUrl + `movies/${id}/upload-image`, formData);
  }

  getMovie(id:string){
    return this.http.get(environment.apiUrl + `movies/${id}/getMovie`,);
  }

  getMoviesList(queryParams: any){
    return this.http.get(environment.apiUrl + 'movies/getMoviesList', { params: queryParams });  
  }

  deleteMovie(id:string){
    return this.http.delete(environment.apiUrl + `movies/${id}/deleteMovie`);
  }

}
