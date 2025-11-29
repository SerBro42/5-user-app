import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

//The purpose of AuthGuard is to allow or prevent the user from accessing certain routes based on the user
//authentication status. If 'true' is returned, navigation can contiune normally. If 'false' is returned, the 
//user is redirected to a set default route, like /login in our case. 
export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService);
  const router = inject(Router);
  if(service.isAuthenticated()) {
    if (isTokenExpired()) {
      service.logout();
      router.navigate(['/login']);
      return false;
    }
    return true;
  }
  router.navigate(['/login']);
  return false;
};

const isTokenExpired = () => {
  const service = inject(AuthService);
  const token = service.token;
  const payload = service.getPayLoad(token);
  //returns in seconds
  const exp = payload.exp;
  //returns in milliseconds
  const now = new Date().getTime() / 1000;
  
  //Checks if current time value is larger than expiration time. If so, the token is expired and we return true. Otherwise, false.
  return (now > exp) ? true : false;
}
