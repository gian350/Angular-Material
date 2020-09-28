import { Component } from '@angular/core';
// decorador de componentes, aqui se importa los componentes del nucleo de Angular
@Component({
  selector: 'app-root', // este es el selector para el componente  que declaramos aqui, que es lo que  se usa dentor de nuestra clase plantilla para especificar donde la vista correspondiente a este componente debe mostrarse en el navegador
  templateUrl: './app.component.html', // contiene la plantilla correspondiente a este componente en particular
  styleUrls: ['./app.component.scss'] //este archivo debe contener todo los estilos css para nuestro componente, acerca de usar boostrap o no , se debe tener en cuenta que se puede usar boostrap , pero solo css, no los componenetes JQuery por que entra en conflicto con el codigo de Angular
})
export class AppComponent {
  title = 'confusion';
}
// este es el archivo que abre el componente raiz que forma parte de nuestra aplicación Angular 