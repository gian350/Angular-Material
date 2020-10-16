import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProcessHTTPMsgService {


  // recibe un error y luego retornara el observable con el mensaje de error incluido
  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error.error instanceof ErrorEvent) { // error de evento (cliente)
      errMsg = error.error.message;
    } else { // error del servidor
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }

    return throwError(errMsg);
  }

  constructor() { }
}
