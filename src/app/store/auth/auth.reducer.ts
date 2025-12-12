import { createReducer, on } from "@ngrx/store"
import { loginSuccess, logout } from "./auth.actions"

export const initialLogin = {
    isAuth: false,
    isAdmin: false,
    user: undefined
}

//If we refresh the browser page, our login data will be reset to default values (see const initialLogin). In order
// to avoid that, we declare this variable by which the login data is extracted from sessionStorage. If there isn't any,
// the state is set to default values.
const initialState = JSON.parse(sessionStorage.getItem('login') || JSON.stringify(initialLogin));

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { login })  => (
        {
            isAuth: true,
            isAdmin: login.isAdmin,
            user: login.user
        }
    )),
    on(logout, (state) => (
        {
            //Instead of writing down the whole object, we can use the shorthand '... initialLogin'
            ... initialLogin
            /* isAuth: false,
            isAdmin: false,
            user: undefined */
        }
    ))
)