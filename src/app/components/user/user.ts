import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user';
import { SharingDataService } from '../../services/sharing-data';
import { PaginatorComponent } from '../paginator/paginator';
import { AuthService } from '../../services/auth';
import { Store } from '@ngrx/store';
import { load } from '../../store/users.actions';

@Component({
  selector: 'user',
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.html'
})
export class UserComponent implements OnInit{
  title: string = 'List of users';

  //This info comes from parent component (UserAppComponent), hence we use @Input
  //Input is removed because we use RouterLink to access, instead of being a child component
  users: User[] = [];

  paginator: any = [];

  constructor(
    private store: Store<{users: any}>,
    private service: UserService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

      this.store.select('users').subscribe(state => {
        this.users = state.users;
        this.paginator = state.paginator;
      });

    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.store.dispatch(load({ page: +(params.get('page') || '0') })))
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

  get admin() {
    return this.authService.isAdmin();
  }
}
