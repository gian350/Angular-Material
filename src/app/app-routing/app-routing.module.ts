import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { routes } from './routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) // aqui le pasamos todas las rutas al routerModule para la configuración de rutas
  ],
  exports: [ // Esto significa que cualquier modulo que importe este NgModule tendra acceso a los modulos exportados
    RouterModule
  ]
})
export class AppRoutingModule { }

/* https://academia-binaria.com/paginas-y-rutas-angular-spa/
  https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries
  https://angular.io/guide/router
  
  */