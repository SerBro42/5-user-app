import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];

  private url: string = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  findAll(): Observable<User[]> {
    //Method alternative to pipe. Using get<...> with User[] to achieve the same result.
    return this.http.get<User[]>(this.url);
  }

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any>(`${this.url}/page/${page}`);
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  create(user: User): Observable<User> {
    // Exclude id field when creating a new user (id === 0) to prevent Hibernate from treating it as an update
    // Hibernate interprets id=0 as an attempt to update an existing entity, causing StaleObjectStateException
    if (user.id === 0) {
      const { id, ...userWithoutId } = user;
      return this.http.post<User>(this.url, userWithoutId);
    }
    return this.http.post<User>(this.url, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  //We changed parameter type from 'void' to 'number' so that we have at least some data that we can pass to the backand.
  remove(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`).pipe(
      map(() => id)
    );
  }
}
