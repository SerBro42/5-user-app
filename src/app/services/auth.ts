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
    return this._user;
  }
  
  //'token' comes from UserAppComponent
  set token(token: string) {
    this._token = token;
    sessionStorage.setItem('token', token);
  }

  get token() {
    return this._token!;
  }
}
