import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';

import { DishService } from './services/dish.service';
// aqui se puede notar que el moduleApp esta conteniendo estos otros modulos y componentes, el modulo raiz es
//  el modulo primario que le ayuda a arrancar a Angular
// este decorador nñModule es un decorador que modifica la clase , para correr angular , nesesitamos de los componentes
// AppComponent es el componente raiz de nuestra aplicación Angular  
@NgModule({
 
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent   // es la propiedad que declara las clases de vista
  ],
  imports: [
    BrowserModule,// se importa los modulos instalados ,osea material y animations
    BrowserAnimationsModule, // estos son los modulos que se van a importar en el modulo de la aplicación.
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [DishService], // los proveedores especifican todos los servicios que este modulo harán uso
  bootstrap: [AppComponent]
})
export class AppModule { }

// Nos damos cuenta de que un modulo en una aplicación Angular  podria consistir en un conjunto de componentes y servicios que se requeriran de este modulo importandolos y estos serán declarados usando la propiedad "declarations"