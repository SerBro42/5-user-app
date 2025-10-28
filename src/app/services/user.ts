import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [{
    id: 1,
    name: 'Alice',
    lastName: 'Unknown',
    email: 'alice@wonderland.com',
    username: 'aliceBeingHere',
    password: '1234'
  },
  {
    id: 2,
    name: 'Snow',
    lastName: 'White',
    email: 'snowhite@dwarveshouse.com',
    username: 'snowWhite',
    password: '1234'
  },
  {
    id: 3,
    name: 'Cinderella',
    lastName: 'Her stepmoms',
    email: 'cinderella@stepsisters.com',
    username: 'LostMyShoeButFoundMyBoo',
    password: '1234'
  }];

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
