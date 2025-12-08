import { createAction, props } from "@ngrx/store";
import { User } from "../models/user";

export const load = createAction('load', props<{ page: number }>());

export const resetUser = createAction('resetUser');
//We create this action in order not to lose the data of the form when we attempt to validate an incomplete form.
export const setUserForm = createAction('setUserForm', props<{ user: User }>());
export const findAll = createAction('findAll', props<{ users: User[] }>());
//It is better to extend an existing functionality than to change it.
export const findAllPageable = createAction('findAllPageable', props<{ users: User[], paginator: any }>());
export const setPaginator = createAction('setPaginator', props<{ paginator: any }>());
export const find = createAction('find', props<{ id: number }>());

export const add = createAction('add', props<{ userNew: User }>());
export const addSuccess = createAction('addSuccess', props<{ userNew: User }>());
export const update = createAction('update', props<{ userUpdated: User }>());
export const updateSuccess = createAction('updateSuccess', props<{ userUpdated: User }>());
export const remove = createAction('remove', props<{ id: number }>());

export const setErrors = createAction('setErrors', props<{ errors: any }>());