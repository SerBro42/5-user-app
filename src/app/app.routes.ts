import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user';
import { FormUserComponent } from './components/form-user/form-user';
import { AuthComponent } from './components/auth/auth';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/users/page/0'
  },
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'users/page/:page',
    component: UserComponent
  },
  {
    path: 'users/create',
    component: FormUserComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users/edit/:id',
    component: FormUserComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: AuthComponent
  }
];
