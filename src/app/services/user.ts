import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];

  constructor(private http: HttpClient) {}

  findAll(): Observable<User[]> {
    //return of(this.users);
    //We use the pipe method to cast our GET result into a different type of observable. The back-end emits a JSON, and as soon
    //as we get it, we tranform it into an array of User-type objects.
    return this.http.get('http://localhost:8080/api/users').pipe(
      map((users:any) => users as User[]),
    );
  }
}
