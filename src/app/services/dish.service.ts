import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {


  getDishes(): Promise<Dish[]> {
    return Promise.resolve(DISHES);
  }

  // función para buscar un plato(dish)
  getDish(id: string): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  // función para retornar plato destacado
  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }


  constructor( ) { }
}
