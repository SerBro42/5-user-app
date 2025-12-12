import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth";
import { Router } from "@angular/router";
import { login, loginSuccess } from "./auth.actions";
import { exhaustMap, map } from "rxjs";

export class AuthEffects {

    login$ = createEffect(() => this.action$.pipe(
        ofType(login),
        exhaustMap( action => this.service.loginUser({username: action.username, password: action.password })
        .pipe(
            map(response => {
                const token = response.token;
                const payload = this.service.getPayload(token);

                const loginData = {
                    user: { username: payload.sub },
                    isAuth: true,
                    isAdmin: payload.isAdmin
                };
                this.service.token = token;
                this.service.user = loginData;
                return loginSuccess({ login: loginData });
            })
        ))
    ));

    constructor(
        private service: AuthService,
        private action$: Actions,
        private router: Router
    ){}
}