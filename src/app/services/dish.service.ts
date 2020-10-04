import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {


  getDishes(): Dish[] {
    return DISHES;
  }

  // función para buscar un plato(dish)
  getDish(id: string): Dish {
    return DISHES.filter((dish) => (dish.id === id))[0];
  }

  // función para retornar plato destacado
  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }


  constructor( ) { }
}
