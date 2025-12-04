import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user";
import { catchError, EMPTY, exhaustMap, map, of } from "rxjs";
import { findAll, findAllPageable, load, setPaginator } from "./users.actions";
import { User } from "../models/user";

//The biggest advantage to having an Effects class is to have a central place where any given Service can be managed in a 
//single place. Better this than having the Service calls scattered throughout different files. This helps with uncoupling.
@Injectable()
export class UsersEffects {
    loadUsers$;

    constructor(
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
    }


}