import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  private _idUserEventEmitter = new EventEmitter();

  private _selectedUserEventEmitter = new EventEmitter();

  get newUserEventEmitter(): EventEmitter<User> {
    return this._newUserEventEmitter;
  }

  get idUserEventEmitter(): EventEmitter<Number> {
    return this._idUserEventEmitter;
  }

  get selectedUserEventEmitter(): EventEmitter<User> {
    return this._selectedUserEventEmitter;
  }

}
