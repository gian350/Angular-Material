import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

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
      return of(DISHES).pipe(delay(2000));

    */
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  // función para buscar un plato(dish)
  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // función para retornar plato destacado
  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // esta función es para retornar todos los IDs de los platos
  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error)); // getDishes puede obtener error, solo basta enviar ese valor
  }


  // esta función es para modificar un dish
  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }


  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
}
