import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute) {
      if(this.router.getCurrentNavigation()?.extras.state) {
        this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      }
    }

  ngOnInit(): void {
    if(this.users == undefined || this.users == null || this.users.length == 0) {
      console.log('running findAll');
      //this.service.findAll().subscribe(users => this.users = users);
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        console.log(page);
        this.service.findAllPageable(page).subscribe(pageable => {
          this.users = pageable.content as User[];
          this.sharingData.pageUsersEventEmitter.emit(this.users);
        });
      })
    }
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
          text: "User deleted from database",
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
