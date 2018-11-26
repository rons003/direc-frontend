import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

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
            const toast = swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });

            toast({
              type: 'success',
              title: 'Signed in successfully'
            });
            this.router.navigate(['employee']);
          }
        },
        err => console.error('Unsuccessful login: ' + err),
      );
  }
}
