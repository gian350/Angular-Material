import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/Dish'; // importamos la clase dish

// este es un componente que se le llamará del componente raiz

import { DishService } from '../services/dish.service';
// servicios

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  // creamos un arreglo de Dish para mostrarlos luego
  dishes: Dish[];
  errMess: string;
  
  //se declara la clase servicio en el constructor, de esta manera ya lo estamos inyectando a este componente
  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) { } // el nombre de la inyección tiene que ser el nombre de la propiedad

  ngOnInit(): void { 
    this.dishService.getDishes()
      .subscribe((dish)=> this.dishes = dish, errmess => this.errMess = <any>errmess);
      
      // el metodo subscribe es practicamente igual que el then en promesas
  }

  /*
  ngOnInit es propio de angular y se ejecuta después del constructor. A diferencia del constructor, ngOnInit pertenece al ciclo de vida propio de angular y es aquí donde le ‘decimos’ que el componente ya está listo para darle uso 

  https://medium.com/zurvin/cu%C3%A1l-es-la-diferencia-entre-ngoninit-y-constructor-en-angular-2f7ce3d986b7#:~:text=ngOnInit%20es%20propio%20de%20angular,est%C3%A1%20listo%20para%20darle%20uso.&text=Otros%20recomiendan%20usar%20el%20constructor,dejar%20el%20resto%20para%20ngOnInit.
  */


}
