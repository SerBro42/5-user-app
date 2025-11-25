import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  private _idUserEventEmitter = new EventEmitter();

  private _findUserByIdEventEmitter = new EventEmitter();

  private _selectUserEventEmitter = new EventEmitter();

  //We need this one in order to emit error data from user-app to form-user
  private _errorsFormUserEventEmitter = new EventEmitter();

  //We need this one to properly update the users on the screen whenever we change page.
  private _pageUsersEventEmitter = new EventEmitter();

  //We need this to emit the username and password from our login/sign in page
  private _handlerLoginEventEmitter = new EventEmitter();

  get handlerLoginEventEmitter() {
    return this._handlerLoginEventEmitter;
  }

  get selectUserEventEmitter() {
    return this._selectUserEventEmitter;
  }

  get findUserByIdEventEmitter() {
    return this._findUserByIdEventEmitter;
  }

  get newUserEventEmitter(): EventEmitter<User> {
    return this._newUserEventEmitter;
  }

  get idUserEventEmitter(): EventEmitter<Number> {
    return this._idUserEventEmitter;
  }

  get errorsFormUserEventEmitter() {
    return this._errorsFormUserEventEmitter;
  }

  get pageUsersEventEmitter() {
    return this._pageUsersEventEmitter;
  }

}
