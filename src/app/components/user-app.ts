import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user';
import { UserComponent } from './user/user';
import { FormUserComponent } from './form-user/form-user';
import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet],
  templateUrl: './user-app.html',
  styleUrls: ['./user-app.css']
})
export class UserAppComponent implements OnInit {

  users: User[] = [];

  //We need to declare this for the edit function
  selectedUser: User;

  open: boolean = false;

  //We need to add this to the constructor for the edit function
  constructor(private service: UserService) {
    this.selectedUser = new User();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
  }

  //We add to the existing users array the new user that we pass in
  addUser(user: User) {
    if (user.id > 0) {
      //map() creates a new instance of an existing array, but modified.
      this.users = this.users.map(u => (u.id == user.id) ? { ...user } : u);
    } else {
      this.users = [... this.users, { ...user, id: new Date().getTime() }];
    }
    Swal.fire({
      title: "Saved!",
      text: "User saved successfully!",
      icon: "success"
    });
    //Wheter we create or update a User, we must clear our local instance of selectedUser
    this.selectedUser = new User();
    this.setOpen();
  }

  removeUser(id: number): void {
    this.users = this.users.filter(user => user.id != id);
  }

  setSelectedUser(userRow: User): void {
    this.selectedUser = { ...userRow };
    this.open = true;
  }

  setOpen() {
    this.open = !this.open;
  }
}
