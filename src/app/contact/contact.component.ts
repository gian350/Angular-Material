import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback'; 

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
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup; //este es el modelo de formulario que se usará
  feedback: Feedback;  // variable de retroalimentación, este seria el model
  contactType = ContactType; 

  @ViewChild('fform') feedbackFormDirective; // nos permite tener acceso al formulario de la plantilla y luego reestablecerlo completamente

  private emailPatron = /\S+@\S+\.\S+/;
  private telefonoPatron = /[0-9]{3}-[0-9]{4}/;


  // inyectamos el servicio de "FormBuilder" para construir la forma reactiva     
  constructor(private fb: FormBuilder) {
      this.createForm();
   }

  ngOnInit(): void {
  }

  // aqui se creará el formulario reactivo 
  createForm() {
    this.feedbackForm = this.fb.group({ // creo un grupo (formgroup)
      firstname: ['',Validators.required], // estos son los formControl que tiene el FormGroup
      lastname: ['',Validators.required],
      telnum: ['',[Validators.required, Validators.pattern(this.telefonoPatron)]],
      email: ['',[Validators.required, Validators.pattern(this.emailPatron)]],
      agree: false,
      contacttype: 'None',// lo dejamos como valor predeterminado
      message: '' // mediante la regla de negocio, podremos tambien no escribir  ningun comentario
    });
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

  // imaginos que el nombre gian ya existe y debe colocar otro

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

  getErrorNum(): string{
    let num_length = this.feedbackForm.get('telnum').value;
    let message="";
    let tipo = typeof num_length;

    if(this.feedbackForm.get('telnum').errors.required){
      message = 'You must enter a value';
    }else{
      if(tipo != 'number'){
        message = "this field has to be numeric ";
      }else{
        if(num_length.length != 9){
          message = "this field must have 9 numbers";
        }
      }
      
    }
    
    return num_length;
  }


  isValidField(field: string): boolean{
    return (
      (this.feedbackForm.get(field).touched || this.feedbackForm.get(field).dirty) && !this.feedbackForm.get(field).valid
    );
  }




}
