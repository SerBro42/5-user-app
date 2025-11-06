import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user';
import { SharingDataService } from '../../services/sharing-data';

@Component({
  selector: 'user',
  imports: [RouterModule],
  templateUrl: './user.html'
})
export class UserComponent implements OnInit{
  title: string = 'List of users';

  //This info comes from parent component (UserAppComponent), hence we use @Input
  //Input is removed because we use RouterLink to access, instead of being a child component
  users: User[] = [];


  constructor(
    private service: UserService,
    private sharingData: SharingDataService,
    private router: Router) {  }

  ngOnInit(): void {
      //This line is to avoid an error in which 'users' is undefined
      this.service.findAll().subscribe(users => this.users = users);
  }

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
        this.sharingData.idUserEventEmitter.emit(id);
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
    this.router.navigate(['/users/edit', user.id]);
  }
}
