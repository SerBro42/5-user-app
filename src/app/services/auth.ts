import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:8080/login';

  //our 'token' can either exist (string) or not (undefined). This will come in handy later, to validate it as undefined.
  private _token: string | undefined;

  //This is the 'login' aka 'user' State. Here, in the Service, we give it the default values. In UserAppComponent we assign it values.
  private _user: any = {
    isAuth: false,
    isAdmin: false,
    user: undefined
  }

  constructor(private http: HttpClient) {}

  loginUser({ username, password }: any): Observable<any> {
    return this.http.post<any>(this.url, { username, password });
  }

  //'login' comes from UserAppComponent
  set user(user: any) {
    this._user = user;
    sessionStorage.setItem('login', JSON.stringify(user));
  }

  get user() {
    if(this._user.isAuth) {
      return this._user;
    } else if (sessionStorage.getItem('login') != null) {
      this._user = JSON.parse(sessionStorage.getItem('login') || '{}');
      return this._user; 
    }
    return this._user;
  }
  
  //'token' comes from UserAppComponent
  set token(token: string) {
    this._token = token;
    sessionStorage.setItem('token', token);
  }

  get token() {
    if(this._token != undefined) {
      return this._token;
    } else if (sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') || '';
      return this._token;
    }
    return this._token!;
  }

  getPayLoad(token: string) {
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
}
