import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'form-user',
  imports: [FormsModule],
  templateUrl: './form-user.html'
})
export class FormUserComponent {

  //A generic user for the form. See constructor for more details.
  user: User;

  //This info will be sent from child to parent component, hence we use @Output.
  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor() {
    this.user = new User();
  }

  onSubmit(): void {
    this.newUserEventEmitter.emit(this.user);
    console.log(this.user);
  }
}
