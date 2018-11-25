import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User;
  constructor() { 
    this.user = new User();
  }
  
  ngOnInit() {

  }

  onSubmit() {
    console.log('submit login');
  }

}
