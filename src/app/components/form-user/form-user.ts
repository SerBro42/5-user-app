import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { SharingDataService } from '../../services/sharing-data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'form-user',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './form-user.html'
})
export class FormUserComponent implements OnInit{

  //A generic user for the form. See constructor for more details.
  user: User;

  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService) {
    this.user = new User();
  }

  ngOnInit(): void {

    this.sharingData.selectUserEventEmitter.subscribe(user => this.user = user);

    this.route.paramMap.subscribe(params => {
      //our local constant variable 'id' is number type, but the 'id' that is being passed is string. So, by means of
      //'+', we convert the string into a number. That in and of itself is not enough, the parameter might be null value.
      //So, to prevent that from, we put a ternary expression between parenthesis, assigning it value '0' in case of null.
      const id: number = +(params.get('id') || '0' );

      if(id > 0) {
        this.sharingData.findUserByIdEventEmitter.emit(id);
      }
    });
  }

  onSubmit(userForm: NgForm): void {
    if(userForm.valid) {
      this.sharingData.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }

  onClear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }
}
