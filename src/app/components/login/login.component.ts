import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User;
  constructor(private router: Router,
    private authService: AuthService) {
    this.user = new User();
  }

  ngOnInit() {

  }

  onSubmit() {
    this
      .authService
      .login(this.user.email, this.user.password)
      .subscribe(
        (res: any) => {
          if (res === 'failed') {
            console.log('error password');
          } else {
            this.router.navigate(['employee']);
          }
        },
        err => console.error('Unsuccessful login: ' + err),
    );
  }
}
