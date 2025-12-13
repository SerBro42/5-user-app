import { createAction, props } from "@ngrx/store";

export const login = createAction('login', props<{username: string, password: string}>());
export const loginSuccess = createAction('login', props<{ login: any }>());
export const loginError = createAction('loginError', props<{ error: string }>());
export const logout = createAction('logout');