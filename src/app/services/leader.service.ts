import { Injectable } from '@angular/core';
import { leader } from '../shared/Leader ';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaderes(): Observable<leader[]> {
    return of(LEADERS).pipe(delay(2000));
  }

  // función para buscar un plato(dish)
  getLeader(id: string): Observable<leader> {
    return of(LEADERS.filter((lead) => (lead.id === id))[0]).pipe(delay(2000));
  }

  // función para retornar plato destacado
  getFeaturedLeader(): Observable<leader> {
    return of(LEADERS.filter((lead) => lead.featured)[0]).pipe(delay(2000));
  }


  constructor() { }
}
