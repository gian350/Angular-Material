import { Injectable } from '@angular/core';
import { leader } from '../shared/Leader ';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaderes(): Observable<leader[]> {
    return this.http.get<leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // función para buscar un plato(dish)
  getLeader(id: string): Observable<leader> {
    return this.http.get<leader>(baseURL + 'leadership' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // función para retornar plato destacado
  getFeaturedLeader(): Observable<leader> {
    return this.http.get<leader>(baseURL + 'leadership?featured=true').pipe(map(lead => lead[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
}
