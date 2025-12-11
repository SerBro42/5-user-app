import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar';
import { SharingDataService } from '../services/sharing-data';
import { AuthService } from '../services/auth';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.html',
  styleUrls: ['./user-app.css']
})
export class UserAppComponent implements OnInit {

  //We need to add this to the constructor for the edit function
  constructor(
    private router: Router,
    private sharingData: SharingDataService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.handlerLogin();
  }

  handlerLogin() {
    this.sharingData.handlerLoginEventEmitter.subscribe(({username, password}) => {
      console.log(username+ ' '+password);

      this.authService.loginUser({username, password}).subscribe({
        next: response => {
          const token = response.token;
          console.log(token);
          //atob is a JavaScript function that decrypts from base64 to a JSON string
          //JSON.parse converts a JSON string into a JavaScript object
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
    })
  }

  //We delete pageUsersEvent() completely

  //We delete findUserById() completely

  //We delete addUser() completely

  //We add the router.navigate(...) line to refresh automatically the page after user deletion.
  //Deleted function to remove User

}
