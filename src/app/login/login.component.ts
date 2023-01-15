import { Component, OnInit } from '@angular/core';
import { ShoppinglistService } from '../shoppinglist.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  auth: any;

  constructor(_auth:ShoppinglistService) { 
    this.auth = _auth;
  }

  ngOnInit(): void {
  }

  logIn(){
    if(this.email == ''){
      alert('Please enter email');
      return;
    }

    if(this.password == ''){
      alert('Please enter password');
      return;
    }

    this.auth.logIn(this.email,this.password);
    this.email = '';
    this.password = '';
  }

}
