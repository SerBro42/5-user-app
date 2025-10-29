import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'user',
  imports: [],
  templateUrl: './user.html'
})
export class UserComponent {

  //This info comes from parent component (UserAppComponent), hence we use @Input
  @Input() users: User[] = [];

  //This event is being emitted from the child component to the parent (UserAppComponent), hence the Output.
  @Output() idUserEventEmitter = new EventEmitter();

  onRemoveUser(id: number): void {

    Swal.fire({
      title: "Confirm delete user",
      text: "Are you sure you wish to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Confirm"
    }).then((result) => {
      if (result.isConfirmed) {
        this.idUserEventEmitter.emit(id);
        Swal.fire({
          title: "Deleted!",
          text: "Article removed from the shopping cart",
          icon: "success"
        });
      }
    });
  }

}
