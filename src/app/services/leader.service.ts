import { Injectable } from '@angular/core';
import { leader } from '../shared/Leader ';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaderes(): Promise<leader[]> {
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS), 2000);
    });
  }

  // función para buscar un plato(dish)
  getLeader(id: string): Promise<leader> {
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.filter((lead) => (lead.id === id))[0]), 2000);
    });
  }

  // función para retornar plato destacado
  getFeaturedLeader(): Promise<leader> {
    return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.filter((lead) => lead.featured)[0]), 2000);
    });
  }


  constructor() { }
}
