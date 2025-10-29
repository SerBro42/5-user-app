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
    email: 'fairest.babe.alive@mirrorz.net',
    username: 'AppleSnaccQueen_7',
    password: '1234'
  },
  {
    id: 3,
    name: 'Cinderella',
    lastName: 'Her stepmoms',
    email: 'cinderella@stepsisters.com',
    username: 'LostMyShoeButFoundMyBoo',
    password: '1234'
  },
  {
    id: 4,
    name: 'Jazmine',
    lastName: 'Ibn Sultan',
    email: 'jazmine@agrabahSultanate.com',
    username: 'AladdinzBae420',
    password: '1234'
  },
  {
    id: 5,
    name: 'Belle',
    lastName: 'McBeast',
    email: 'beastly.luvr.4eva@castlechat.com',
    username: 'BeastModeBae_4Eva',
    password: '1234'
  },
  {
    id: 6,
    name: 'Vlad',
    lastName: 'Tepes',
    email: 'vladtheimpaler42@wallachiamail.com',
    username: 'shishkebab4evah',
    password: '1234'
  }];

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
