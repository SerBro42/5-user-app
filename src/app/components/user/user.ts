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
  //It emits only the Id of the user.
  @Output() idUserEventEmitter = new EventEmitter();

  //This output, on the other hand, emits the whole user.
  @Output() selectedUserEventEmitter = new EventEmitter();

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

  //Difference between Delete and Update functions: Delete only emits ID and Update emits the whole User.
  onSelectedUser(user: User): void {
    this.selectedUserEventEmitter.emit(user);
  }
}
