import { Component } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html'
})
export class AuthComponent {

  user: User;

  constructor(private sharingData: SharingDataService) {
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
      //console.log(this.user);
      this.sharingData.handlerLoginEventEmitter.emit({username: this.user.username, password: this.user.password});
    }
  }

}
