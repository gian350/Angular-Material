import { Injectable } from '@angular/core';
import { leader } from '../shared/Leader ';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaderes(): Promise<leader[]> {
    return Promise.resolve(LEADERS);
  }

  // función para buscar un plato(dish)
  getLeader(id: string): Promise<leader> {
    return Promise.resolve(LEADERS.filter((lead) => (lead.id === id))[0]);
  }

  // función para retornar plato destacado
  getFeaturedLeader(): Promise<leader> {
    return Promise.resolve(LEADERS.filter((lead) => lead.featured)[0]);
  }


  constructor() { }
}
