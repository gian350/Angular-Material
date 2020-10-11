import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  // las promesas y los observables son similares pero los observables son mejores ya que actuan tambien de promesas, los dos son aplicados para operaciones asincronas como peticiones HTTP

  getDishes(): Observable<Dish[]> {
   /* ------ Estructura de una promesa  
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES), 2000);
    });
      ------ Estructura de un observable que devuelve una promesa
      return of(DISHES).pipe(delay(2000)).toPromise();
      
      ------ Estructura de un observable que devuelve observables, para este caso
      se tiene que modificar el componente que recibe el observable

    */

    return of(DISHES).pipe(delay(2000));
  }

  // función para buscar un plato(dish)
  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  // función para retornar plato destacado
  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  // esta función es para retornar todos los IDs de los platos
  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id ));
  }


  constructor( ) { }
}
