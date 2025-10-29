import { Component, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user',
  imports: [],
  templateUrl: './user.html'
})
export class UserComponent {

  //This info comes from parent component (UserAppComponent), hence we use @Input
  @Input() users: User[] = [];

}
