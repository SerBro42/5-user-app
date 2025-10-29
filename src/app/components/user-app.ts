import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user';
import { UserComponent } from './user/user';

@Component({
  selector: 'user-app',
  imports: [UserComponent],
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
}
