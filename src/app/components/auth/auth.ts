import { Component } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html'
})
export class AuthComponent {

  user: User;

  constructor(
    private store: Store<{auth: any}>
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
      //We remove all previous logic from this component and we replace it with a call to the Store.
      this.store.dispatch(login({username: this.user.username, password: this.user.password}));
    }
  }

}
