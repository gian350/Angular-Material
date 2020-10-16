/* ------------- Componentes angulares y material-angular ----------*/ 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';

// componentes reactivos
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';


/* ------------- Componentes App ----------*/ 
import { AppComponent } from './app.component';

/* ------------- Componentes añadidos ----------*/ 
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

/* ------------- Servicios añadidos ----------*/ 
import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';

import { baseURL } from './shared/baseurl';

// aqui se puede notar que el moduleApp esta conteniendo estos otros modulos y componentes, el modulo raiz es
//  el modulo primario que le ayuda a arrancar a Angular
// este decorador nñModule es un decorador que modifica la clase , para correr angular , nesesitamos de los componentes
// AppComponent es el componente raiz de nuestra aplicación Angular  
@NgModule({
 
  declarations: [// Aqui se guarda los componentes que se utilizara en el modulo de la aplicación
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent   
  ],
  imports: [// estos son los modulos que se van a importar en el modulo de la aplicación.
    BrowserModule,
    BrowserAnimationsModule, 
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    HttpClientModule
  ],
  providers: [// los proveedores especifican todos los servicios que este modulo harán uso
    DishService,
    PromotionService,
    LeaderService,
    ProcessHTTPMsgService,
    {provide: 'BaseURL', useValue: baseURL} // se puede proveer una propiedad global
  ], 
  bootstrap: [AppComponent],
  entryComponents: [ // cuando se coloca un componente como componente de entrada, esto hace posible
    LoginComponent // la superposición de componentes, osea un dialog, por eso se coloca aqui el LoginComponent
],
})
export class AppModule { }

// Nos damos cuenta de que un modulo en una aplicación Angular  podria consistir en un conjunto de componentes y servicios que se requeriran de este modulo importandolos y estos serán declarados usando la propiedad "declarations"