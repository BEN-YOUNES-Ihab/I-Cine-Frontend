import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SessionToEdit } from '../models/session';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http: HttpClient) { }
 

  createSession(session: SessionToEdit) {
    return this.http.post(environment.apiUrl + 'sessions/createSession', session);
  }

//   updateMovie(id:string, movie:MovieToEdit) {
//     return this.http.patch<any>(environment.apiUrl + `movies/${id}/updateMovie`, movie);
//   }
  
//   updateMovieImage(id:string, formData: FormData) {
//     return this.http.post<any>(environment.apiUrl + `movies/${id}/upload-image`, formData);
//   }


  getSessionsList(queryParams: any){
    return this.http.get(environment.apiUrl + 'sessions/getSessionsList', { params: queryParams });  
  }

//   deleteMovie(id:string){
//     return this.http.delete(environment.apiUrl + `movies/${id}/deleteMovie`);
//   }

}
