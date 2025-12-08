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

          //Having parsed the payload, we extract relevant data from it and save them in sessionStorage. You might want to declare isAuth
          //as 'true' instead of payload.isAuth. Turns out, I had to do precisely that (28/11/2025)
          const user = { username: payload.sub };
          const login = {
            user,
            isAuth: true,
            isAdmin: payload.isAdmin
          };
          //sessionStorage only stores String-type data, and 'login' is an object. We must transform it into String first. We do it by means 
          //of JSON.stringify().
          //We decided to move the line that saves 'login' from here to AuthService
          this.authService.token = token;
          this.authService.user = login;
          this.router.navigate(['/users/page/0']);
          //This line was added for debugging purposes. Remove when no longer needed.
          console.log(payload);
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
