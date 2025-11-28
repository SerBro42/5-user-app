import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html'
})
export class NavbarComponent {

  constructor(private authService: AuthService) {}

  @Input() users: User[] = [];
  @Input() paginator = {};

  get login() {
    return this.authService.user;
  }

  get admin() {
    return this.authService.isAdmin();
  }
}
