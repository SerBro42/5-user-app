import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar';
import { SharingDataService } from '../services/sharing-data';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.html',
  styleUrls: ['./user-app.css']
})
export class UserAppComponent implements OnInit {

  users: User[] = [];

  //We need to declare this for the edit function

  //We need to add this to the constructor for the edit function
  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService) {
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  findUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {

      const user = this.users.find(user => user.id == id);

      this.sharingData.selectUserEventEmitter.emit(user);
    })
  }

  //We add to the existing users array the new user that we pass in
  //We add the router.navigate(...) line to refresh the page once we add a user.
  addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if (user.id > 0) {
        this.service.update(user).subscribe(
          {
            next: (userUpdated) => {
              //map() creates a new instance of an existing array, but modified.
              this.users = this.users.map(u => (u.id == userUpdated.id) ? { ...userUpdated } : u);
              this.router.navigate(['/users'], { state: { users: this.users } });
            },
            error: (err) => {
              console.log(err.error)
            }
          }
        )
      } else {
        this.service.create(user).subscribe({
          next: userNew => {
            console.log(userNew);
            this.users = [... this.users, { ...userNew }];
            this.router.navigate(['/users'], { state: { users: this.users } });
          },
          error: (err) => {
            console.log(err.error)
          }
        })
      }
      Swal.fire({
        title: "Saved!",
        text: "User saved successfully!",
        icon: "success"
      });
    })
  }

  //We add the router.navigate(...) line to refresh automatically the page after user deletion.
  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      //Coerce incoming id to a primitive number before passing to the service/remove and comparisons.
      const idNum: number = Number(id);
      this.service.remove(idNum).subscribe(() => {
        this.users = this.users.filter(user => user.id != idNum);
        this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
          this.router.navigate(['/users'], { state: { users: this.users } });
        });
      })
    })
  }

}
