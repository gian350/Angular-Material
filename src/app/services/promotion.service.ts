import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // función para buscar un plato(dish)
  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // función para retornar plato destacado
  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(map(pro => pro[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
}
