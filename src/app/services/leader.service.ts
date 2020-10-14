import { Injectable } from '@angular/core';
import { leader } from '../shared/Leader ';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaderes(): Observable<leader[]> {
    return this.http.get<leader[]>(baseURL + 'leadership');
  }

  // función para buscar un plato(dish)
  getLeader(id: string): Observable<leader> {
    return this.http.get<leader>(baseURL + 'leadership' + id);
  }

  // función para retornar plato destacado
  getFeaturedLeader(): Observable<leader> {
    return this.http.get<leader>(baseURL + 'leadership?featured=true').pipe(map(lead => lead[0]));
  }


  constructor(private http: HttpClient) { }
}
