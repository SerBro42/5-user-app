import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, logout } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:8080/login';

  //This is the 'login' aka 'user' State. Here, in the Service, we give it the default values. From now on, the Auth will be managed by
  //auth store.
  private _user: any;

  constructor(
    private store: Store<{auth: any}>,
    private http: HttpClient) {
      this.store.select('auth').subscribe(state => {
        this._user = state;
      })
    }

  loginUser({ username, password }: any): Observable<any> {
    return this.http.post<any>(this.url, { username, password });
  }

  //'login' comes from UserAppComponent
  set user(user: any) {
    sessionStorage.setItem('login', JSON.stringify(user));
  }

  get user() {
    //The user will be obtained from the Store
    return this._user;
  }
  
  //'token' comes from UserAppComponent
  set token(token: string) {
    sessionStorage.setItem('token', token);
  }

  //Now, the token comes from sessionStorage
  get token() {
    return sessionStorage.getItem('token')!;
  }

  getPayload(token: string) {
    if (token != null) {
      //This line comes from UserAppComponent. It is more appropriate to put it here.
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;
  }

  isAdmin() {
    //Here, we're calling the get method, not the attribute. Hence, the absence of ':'
    return this.user.isAdmin;
  }

  isAuthenticated() {
    return this.user.isAuth;
  }

  logout() {
    this.store.dispatch(logout());
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('token');
  }
}
