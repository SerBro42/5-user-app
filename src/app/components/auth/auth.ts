import { Component } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html'
})
export class Auth {

  user: User;

  constructor() {
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
      console.log(this.user);
    }
  }

}
