import { Injectable } from '@angular/core';
import { leader } from '../shared/Leader ';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaderes(): leader[] {
    return LEADERS;
  }

  // función para buscar un plato(dish)
  getLeader(id: string): leader {
    return LEADERS.filter((lead) => (lead.id === id))[0];
  }

  // función para retornar plato destacado
  getFeaturedLeader(): leader {
    return LEADERS.filter((lead) => lead.featured)[0];
  }


  constructor() { }
}
