import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user';
import { FormUserComponent } from './components/form-user/form-user';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/users'
  },
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'users/create',
    component: FormUserComponent
  },
  {
    path: 'users/edit/:id',
    component: FormUserComponent
  }
];
