import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user';
import { UserComponent } from './user/user';
import { FormUserComponent } from './form-user/form-user';

@Component({
  selector: 'user-app',
  imports: [UserComponent, FormUserComponent],
  templateUrl: './user-app.html'
})
export class UserAppComponent implements OnInit{
  title: string = 'List of users';

  users: User[] = [];

  constructor(private service: UserService) {

  }

  ngOnInit(): void {
    this.service.findAll().subscribe( users => this.users = users );
  }

  //We add to the existing users array the new user that we pass in
  addUser(user: User) {
    this.users = [... this.users, {... user, id: new Date().getTime() }];
  }

  removeUser(id: number): void {
    this.users = this.users.filter(user => user.id != id);
  }
}
