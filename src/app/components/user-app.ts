import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar';
import { SharingDataService } from '../services/sharing-data';
import { AuthService } from '../services/auth';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.html',
  styleUrls: ['./user-app.css']
})
export class UserAppComponent implements OnInit {

  users: User[] = [];
  paginator: any = {};


  //We need to add this to the constructor for the edit function
  constructor(
    
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    //this.service.findAll().subscribe(users => this.users = users);
    // this.route.paramMap.subscribe(params => {
    //   const page = +(params.get('page') || '0');
    //   console.log(page);
    //   //this.service.findAllPageable(page).subscribe(pageable => this.users = pageable.content as User[]);
    // })
    this.addUser();
    this.removeUser();
    this.findUserById();
    this.pageUsersEvent();
    this.handlerLogin();
  }

  handlerLogin() {
    this.sharingData.handlerLoginEventEmitter.subscribe(({username, password}) => {
      console.log(username+ ' '+password);

      this.authService.loginUser({username, password}).subscribe({
        next: response => {
          const token = response.token;
          console.log(token);
          //atob is a JavaScript function that decrypts from base64 to a JSON string
          //JSON.parse converts a JSON string into a JavaScript object
          //The original line, featuring atob and JSON.parse, was transferred to AuthService. This was done to make the code mor reusable and more modular.
          const payload = this.authService.getPayLoad(token);

          //Having parsed the payload, we extract relevant data from it and save them in sessionStorage. You might want to declare isAuth
          //as 'true' instead of payload.isAuth. Turns out, I had to do precisely that (28/11/2025)
          const user = { username: payload.sub };
          const login = {
            user,
            isAuth: true,
            isAdmin: payload.isAdmin
          };
          //sessionStorage only stores String-type data, and 'login' is an object. We must transform it into String first. We do it by means 
          //of JSON.stringify().
          //We decided to move the line that saves 'login' from here to AuthService
          this.authService.token = token;
          this.authService.user = login;
          this.router.navigate(['/users/page/0']);
          //This line was added for debugging purposes. Remove when no longer needed.
          console.log(payload);
        },
        error: error => {
          if (error.status == 401) {
            Swal.fire('Login error', error.error.message , 'error')
          } else {
            throw error;
          }
        }
      })
    })
  }

  pageUsersEvent() {
    this.sharingData.pageUsersEventEmitter.subscribe(pageable => {
      this.users = pageable.users;
      this.paginator = pageable.paginator;
    });
  }

  findUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {

      const user = this.users.find(user => user.id == id);

      this.sharingData.selectUserEventEmitter.emit(user);
    })
  }

  //We add to the existing users array the new user that we pass in
  //We add the router.navigate(...) line to refresh the page once we add a user.
  addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if (user.id > 0) {
        this.service.update(user).subscribe(
          {
            next: (userUpdated) => {
              //map() creates a new instance of an existing array, but modified.
              this.users = this.users.map(u => (u.id == userUpdated.id) ? { ...userUpdated } : u);
              this.router.navigate(['/users'], {
                state: {
                  users: this.users,
                  paginator: this.paginator
                }
              });

              Swal.fire({
                title: "User updated!",
                text: "User edited successfully!",
                icon: "success"
              });
            },
            error: (err) => {
              //console.log(err.error)
              //both here and in the 'else' clause, we know that the errors are displayed correctly. Next step is to emit them
              //where they are actually needed, which is form-user component.
              if (err.status == 400) {
                this.sharingData.errorsFormUserEventEmitter.emit(err.error);
              }
            }
          }
        )
      } else {
        this.service.create(user).subscribe({
          next: userNew => {
            console.log(userNew);
            this.users = [... this.users, { ...userNew }];
            this.router.navigate(['/users'], {
              state: {
                users: this.users,
                paginator: this.paginator
              }
            });

            Swal.fire({
              title: "New user created!",
              text: "User saved successfully!",
              icon: "success"
            });
          },
          error: (err) => {
            //console.log(err.error)
            //console.log(err.status);
            if (err.status == 400) {
              this.sharingData.errorsFormUserEventEmitter.emit(err.error);
            }
          }
        })
      }

    })
  }

  //We add the router.navigate(...) line to refresh automatically the page after user deletion.
  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      //Coerce incoming id to a primitive number before passing to the service/remove and comparisons.
      const idNum: number = Number(id);
      this.service.remove(idNum).subscribe(() => {
        this.users = this.users.filter(user => user.id != idNum);
        this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
          this.router.navigate(['/users'], {
            state: {
              users: this.users,
              paginator: this.paginator
            }
          });
        });
      })
    })
  }

}
