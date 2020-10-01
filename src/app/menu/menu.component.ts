import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/Dish'; // importamos la clase dish
import { DISHES } from '../shared/Dishes';
// este es un componente que se le llamará del componente raiz


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  // creamos un arreglo de Dish para mostrarlos luego
  dishes: Dish[] = DISHES;

  selectedDishdetail: Dish; // aqui creo la variable que guardará el valor seleccionado

  

  constructor() { }

  ngOnInit(): void {
  }

  // este metodo es como un set, introducirá el valor del plato seleccionado por medio del parametro hacia el atributo local de esta clase "selectedDish"
  onSelect(item: Dish) {
    this.selectedDishdetail = item;
  }

}
