import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/Dish';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  // Esta anotación sirve para denotar a la variable "dishesDetail" como variable de entrada asociada a la variable que  proviene desde la plantilla de otro componente, en este caso es de "menu" 
  // El nombre de la propiedad tiene que ser la misma
  @Input()
  dishesDetail :Dish;




  constructor() { }

  ngOnInit(): void {
  }

}
