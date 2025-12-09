import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { add, find, resetUser, update } from '../../store/users.actions';

@Component({
  selector: 'form-user',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './form-user.html'
})
export class FormUserComponent implements OnInit{

  //A generic user for the form. See constructor for more details.
  user: User;
  errors: any = {};

  //We are gradually replacing all Service calles with Store
  constructor(
    private store: Store<{ users: any }>,
    private route: ActivatedRoute) {
    this.user = new User();
    this.store.select('users').subscribe(state => {
      this.errors = state.errors;
      this.user = { ...state.user };
    })
  }

  //There are two alternatives for obtaining the user info by ID: the first (the one that we originally implemented) involves
  //calling the Angular State. The second involves calling the back-end. We have opted to stay on our original paradigm for now.
  ngOnInit(): void {
    this.store.dispatch(resetUser());

    this.route.paramMap.subscribe(params => {
      //our local constant variable 'id' is number type, but the 'id' that is being passed is string. So, by means of
      //'+', we convert the string into a number. That in and of itself is not enough, the parameter might be null value.
      //So, to prevent that from, we put a ternary expression between parenthesis, assigning it value '0' in case of null.
      const id: number = +(params.get('id') || '0' );

      if(id > 0) {
        this.store.dispatch(find({ id }));
      }
    });
  }

  onSubmit(userForm: NgForm): void {

    if (this.user.id > 0) {      
      this.store.dispatch(update({ userUpdated: this.user }))
    } else {
      this.store.dispatch(add({ userNew: this.user }))
    }
    //By deleting this line, whenever some fields are valid and others not instead of clearing the entire form, the correct 
    // fields that were submitted previously are populated once again.
  }

  onClear(userForm: NgForm): void {
    this.store.dispatch(resetUser());
    userForm.reset();
    userForm.resetForm();
  }
}
