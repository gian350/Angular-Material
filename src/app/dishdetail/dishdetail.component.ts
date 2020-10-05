import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  // Esta anotación sirve para denotar a la variable "dishesDetail" como variable de entrada asociada a la variable que  proviene desde la plantilla de otro componente, en este caso es de "menu" 
  // El nombre de la propiedad tiene que ser la misma
 /* 
  El primer metodo para pasar información de un componenete a  otro fue con el @Input
  @Input()
  dishesDetail :Dish;
  */

  // El segundo metodo fue mandando información mediante la ruta

  dishesDetail: Dish;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.dishesDetail = this.dishservice.getDish(id);
  }

  goBack(): void {
    this.location.back(); // para volver a la pagina anterior 
  }

}
