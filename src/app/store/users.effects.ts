import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user";
import { catchError, EMPTY, exhaustMap, map, of, tap } from "rxjs";
import { add, addSuccess, findAll, findAllPageable, load, remove, removeSuccess, setErrors, setPaginator, update, updateSuccess } from "./users.actions";
import { User } from "../models/user";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

//The biggest advantage to having an Effects class is to have a central place where any given Service can be managed in a 
//single place. Better this than having the Service calls scattered throughout different files. This helps with uncoupling.
@Injectable()
export class UsersEffects {
    loadUsers$;
    addUser$;
    addSuccessUser$;
    updateUser$;
    updateSuccessUser$;
    removeUser$;
    removeSuccessUser$;

    constructor(
        private router: Router,
        private actions$: Actions,
        private service: UserService
    ){
        this.loadUsers$ = createEffect(
            () => this.actions$.pipe(
                ofType(load),
                exhaustMap((action) => this.service.findAllPageable(action.page)
                .pipe(
                    map((pageable) => {
                        const users = pageable.content as User[];
                        const paginator = pageable;

                        return findAllPageable({ users, paginator });
                    }),
                    catchError((error) => of(error))
                ))
            )
        )

        this.addUser$ = createEffect(
            () => this.actions$.pipe(
                ofType(add),
                exhaustMap((action) => this.service.create(action.userNew)
                .pipe(
                    map(userNew => {
                        return addSuccess({userNew})
                    }),
                    catchError( error => (error.status == 400) ? of(setErrors({ errors: error.error })) : EMPTY)
                ))
            )
        )

        this.updateUser$ = createEffect(
            () => this.actions$.pipe(
                ofType(update),
                exhaustMap((action) => this.service.update(action.userUpdated)
                .pipe(
                    map(userUpdated => {
                        return updateSuccess({userUpdated})
                    }),
                    catchError( error => (error.status == 400) ? of(setErrors({ errors: error.error })) : EMPTY)
                ))
            )
        )

        this.removeUser$ = createEffect(
            () => this.actions$.pipe(
                ofType(remove),
                exhaustMap((action) => this.service.remove(action.id)
                .pipe(
                    map(id => {
                        return removeSuccess({id})
                    }),
                    catchError( error => (error.status == 400) ? of(setErrors({ errors: error.error })) : EMPTY)
                ))
            )
        )
        
        this.addSuccessUser$ = createEffect(
            () => this.actions$.pipe(
                ofType(addSuccess),
                tap(() => {
                    this.router.navigate(['/users']);
                    
                    Swal.fire({
                        title: "New user created!",
                        text: "User saved successfully!",
                        icon: "success"
                    });
                })
            ), {dispatch: false}
        )

        this.updateSuccessUser$ = createEffect(
            () => this.actions$.pipe(
                ofType(updateSuccess),
                tap(() => {
                    this.router.navigate(['/users']);
                    
                    Swal.fire({
                        title: "User updated!",
                        text: "User edited successfully!",
                        icon: "success"
                    });
                })
            ), {dispatch: false}
        )

        this.removeSuccessUser$ = createEffect(
            () => this.actions$.pipe(
                ofType(removeSuccess),
                tap(() => {
                    this.router.navigate(['/users']);
                    
                    Swal.fire({
                        title: "Deleted!",
                        text: "User deleted from database",
                        icon: "success"
                    });
                })
            ), {dispatch: false}
        )
    }


}