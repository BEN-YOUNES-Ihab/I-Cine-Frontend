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

  updateSession(id:string, session:SessionToEdit) {
    return this.http.patch<any>(environment.apiUrl + `sessions/${id}/updateSession`, session);
  }
  

  getSessionsList(queryParams: any){
    return this.http.get(environment.apiUrl + 'sessions/getSessionsByMovieId', { params: queryParams });  
  }

  deleteSession(id:string){
    return this.http.delete(environment.apiUrl + `sessions/${id}/deleteSession`);
  }

}
