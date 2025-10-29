import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-user',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './form-user.html'
})
export class FormUserComponent {

  //A generic user for the form. See constructor for more details.
  @Input() user: User;

  //This info will be sent from child to parent component, hence we use @Output.
  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor() {
    this.user = new User();
  }

  onSubmit(userForm: NgForm): void {
    if(userForm.valid) {
      this.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }
}
