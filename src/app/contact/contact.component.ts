import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback'; 

import { flyInOut } from '../animations/app.animation';

/* ViewChild - esto permite tener acceso a cualquier de los elementos DOM hijos o secundarios dentro de la vista

https://medium.com/technofunnel/angular-viewchild-and-viewchildren-fde2d252b9ab

 - @ViewChild se puede utilizar para obtener la referencia del elemento DOM representado dentro de un     componente Angular.  Podemos usar la referencia del elemento DOM para manipular las propiedades del elemento. Para obtener el componente, necesitamos especificar el selector.
    Ej: Acceso al elemento DOM con JavaScript
    let domReference - documento. getElementById("someElement");

    Acceda al elemento DOM mediante angular @ViewChild
    @ViewChild("someElement") domReference;

  - Nos permite realizar búsquedas en la vista sin necesidad de crear una template variable.

*/

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: { // es el anfitrion
    '[@flyInOut]': 'true', // una animation para el anfitrion osea esta plantilla
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup; //este es el modelo de formulario que se usará
  feedback: Feedback;  // variable de retroalimentación, este seria el model
  contactType = ContactType; 

  @ViewChild('fform') feedbackFormDirective; // nos permite tener acceso al formulario de la plantilla y luego reestablecerlo completamente

  private emailPatron = /\S+@\S+\.\S+/;
  private telefonoPatron = /^9[0-9]{8}$/;

  // fijo -> /[0-9]{3}-[0-9]{4}/
  // inyectamos el servicio de "FormBuilder" para construir la forma reactiva     
  constructor(private fb: FormBuilder) {
      this.createForm();
   }

  ngOnInit(): void {
  }

  // aqui se creará el formulario reactivo 
  createForm() {
    this.feedbackForm = this.fb.group({ // creo un grupo (formgroup)
      firstname: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(25)]], // estos son los formControl que tiene el FormGroup
      lastname: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['',[Validators.required, Validators.pattern(this.telefonoPatron)]],
      email: ['',[Validators.required, Validators.pattern(this.emailPatron)]],
      agree: false,
      contacttype: 'None',// lo dejamos como valor predeterminado
      message: '' // mediante la regla de negocio, podremos tambien no escribir  ningun comentario
    });

    this.feedbackForm.valueChanges // 
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // reestablecer los mensajes de validación

  }

  onSubmit() {
   /* this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset(); // vuelve a null todos los formControl*/
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackFormDirective.resetForm(); // este resetea el formulario osea la plantilla
    this.feedbackForm.reset({ // resetea el feedbackForm
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }


  //------------------------------
  // fields
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  // mensajes de validación
  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only nine numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'pattern':       'Email not in valid format.'
    },
  };



  onValueChanged(data?: any) { // recibe un dato o ninguno
    if (!this.feedbackForm) {
      return; // si el formulario no esta creado no retorna nada 
    }
    
    const form = this.feedbackForm; // form equivale al formulario en si

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

  /*
    hasOwnProperty -> Determina si un objeto tiene una propiedad con el nombre especificado

    control.errors -> Un objeto que contiene cualquier error generado por una validación fallida, o nulo si no hay errores.

    ValidationsError -> Define el mapa de errores devueltos por comprobaciones de validación fallidas osea devuelve los errores que se tiene en un imput

    --- Forma anterior 
    

  comprobarNombre(): boolean{
    if(this.feedbackForm.get('firstname').value === 'gian'){
      return true;
    }else{
      return false;
    }
  }

  getErrorMessage(field: string): string{
    let message;
    if(this.feedbackForm.get(field).errors.required){
      message = 'You must enter a value';
    }else if(this.feedbackForm.get(field).hasError('pattern')){
      if(field == 'email'){
        message = 'Not a valid email';
      }else{
        message = 'Not a valid phone';
      }
      
    }else if(this.feedbackForm.get(field).hasError('minLength')){
      const minLength = this.feedbackForm.get(field).errors?.minLength.requiredLength
      message = `This field must be longer than ${minLength} characters`      
    }
    return message;
  }

  isValidField(field: string): boolean{
    return (
      (this.feedbackForm.get(field).touched || this.feedbackForm.get(field).dirty) && !this.feedbackForm.get(field).valid
    );
  }

  El ValueChanges es un evento generado por los formularios Angular cada vez que cambia el valor de FormControl, FormGroup o FormArray. Devuelve un observable para que pueda suscribirse a él. El observable obtiene el último valor del control. Nos permite realizar un seguimiento de los cambios realizados en el valor en tiempo real y responder a él. Por ejemplo, podemos usarlo para validar el valor, calcular los campos calculados, etc.
  
  */


}
