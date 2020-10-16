import { Component, OnInit, ViewChild,Input, Inject } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { comment } from '../shared/comment';


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
  dishIds: string[];
  prev: string;
  next: string;
  
  errMess: string;

  modelComent: comment;
  ComentForm: FormGroup;
  @ViewChild('fform') ComentFormDirective;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds); // obtengo los IDs y dentro de la suscripción puedo asignar directamente ahi el dishIDs
    this.route.params
      .pipe(switchMap((params:Params)=> this.dishservice.getDish(params['id'])))// mediante el switchMap obtiene el valor del dish escogido y coge el parametro id
      .subscribe(dishesDetail => { this.dishesDetail = dishesDetail; this.setPrevNext(dishesDetail.id), errmess => this.errMess = <any>errmess }); // aqui le asigna al plato escogido
    

    //--------------
    this.ComentForm = this.fb.group({ 
      author: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
      rating: [5],
      comment: ['',[Validators.required]]
    });

    this.ComentForm.valueChanges 
      .subscribe(data => this.onValueChanged(data));

  }

  onSubmit() {
    /* this.feedback = this.feedbackForm.value;
     console.log(this.feedback);
     this.feedbackForm.reset(); // vuelve a null todos los formControl*/
     this.modelComent = this.ComentForm.value;
     var d = new Date();
     var fecha = d.toISOString();
     this.modelComent.date = fecha;
     this.dishesDetail.comments.push(this.modelComent);
     console.log(this.modelComent);
     this.ComentFormDirective.resetForm(); // este resetea el formulario osea la plantilla
     this.ComentForm.reset({ // resetea el feedbackForm
       author: '',
       rating: 5,
       comment: '',
       date: ''
     });
   }




  // este metodo es para asignar el siguiente y anterior recibiendo al dish actual
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back(); // para volver a la pagina anterior 
  }

  //---------------- mensajes de error

  formErrors = {
    'author': '',
    'comment': '',
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Coment is required.',
    }
  };


  onValueChanged(data?: any) { // recibe un dato o ninguno
    if (!this.ComentForm) {
      return; // si el formulario no esta creado no retorna nada 
    }
    
    const form = this.ComentForm; // form equivale al formulario en si

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {// verifica si la propiedad "field" esta dentro de formErrors
        
        this.formErrors[field] = ''; // borrar el mensaje de error anterior (si corresponde) 
        const control = form.get(field); // obtenemos el AbstractControl segun el field osea campo
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field]; // obtiene los errores posibles y sus mensajes
          for (const key in control.errors) { // recorrer el 
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }












}


















/* Para obtener el parametro id de la ruta de los platos de Menu hay dos maneras
    - Usando la instantánea de ruta,
    - Uso de Router Observables
    INFO
    https://medium.com/@tiboprea/accessing-url-parameters-in-angular-snapshot-vs-subscription-efc4e70f9053

    Si tiene la intención de no actualizar el parámetro URL dentro del mismo componente al que está accediendo a él, puede utilizar la instantánea(snapshot).

    let id = this.route.snapshot.params['id'];
    this.dishservice.getDish(id)
      .subscribe((dishdetail)=> this.dishesDetail = dishdetail);

    Si tiene la intención de actualizar el parámetro URL dentro del mismo componente, debe usar una suscripción(observables)

    En conclusión para el primer caso no se podra modificar el contenido por que no cambia el valor del parametro, pero si se quiere actualizar en el mismo componente se nesesita usar programación reactiva
    */

// params es un parametro observable  