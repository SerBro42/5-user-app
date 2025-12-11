import { Component } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html'
})
export class AuthComponent {

  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = new User();
  }

  onSubmit() {
    if(!this.user.username || !this.user.password){
      Swal.fire(
        'Validation error',
        'Username and password required!',
        'error'
      );
    } else {
      //We move all this logic from UserAppComponent to here
      this.authService.loginUser({ username: this.user.username, password: this.user.password }).subscribe({
        next: response => {
          const token = response.token;
          console.log(token);
          //The original line, featuring atob and JSON.parse, was transferred to AuthService. This was done to make the code mor reusable and more modular.
          const payload = this.authService.getPayLoad(token);

          //sessionStorage only stores String-type data, and 'login' is an object. We must transform it into String first. We do it by means 
          //of JSON.stringify().
          //We decided to move the line that saves 'login' from here to AuthService
          this.authService.token = token;
          //We decided to save some variables by declaring the value of 'user' here,
          this.authService.user = {
            user: { username: payload.sub },
            isAuth: true,
            isAdmin: payload.isAdmin
          };
          
          this.router.navigate(['/users']);
        },
        error: error => {
          if (error.status == 401) {
            Swal.fire('Login error', error.error.message , 'error')
          } else {
            throw error;
          }
        }
      })
    }
  }

}
