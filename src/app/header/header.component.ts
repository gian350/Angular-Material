import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { } // se inyecta el servicio de dialogos, que nos permite abrir un componente como un componente de dialogo

  openLoginForm(){
    this.dialog.open(LoginComponent, {width: '600px', height: '600px'})
  }

  ngOnInit(): void {
  }

}
