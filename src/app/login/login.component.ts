import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
// componente de angular material para los dialogs
// estos componentes convierten a este componente en dialog

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // este objeto será usado de forma bidireccional entre el template y el componente
  // lo que implica que al modificarse desde el componente afectará al template
  // y si se modifica en el template tambien se modificará en el componente
  // la bidireccionalidad se evidencia ya que tiene esta forma [(ngModel)] es en tiempo real 
  user = {username: '', password: '', remember: false};

  constructor(public dialogRef: MatDialogRef<LoginComponent>) { } // le paso la clase como atributo para manipular esa clase con la referencia al dialogo "MatDialogRef"

  ngOnInit(): void {
  }

  // metodo para logearse
  onSubmit(){
    console.log('user',this.user);
    this.dialogRef.close();
  }

}
