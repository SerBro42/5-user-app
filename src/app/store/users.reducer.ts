import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user";
import { find, findAll, setPaginator } from "./users.actions";

const users: User[] = [];
const user: User = new User();
export const usersReducer = createReducer(
    {
        users,
        paginator: {},
        user
    },
    on(findAll, (state, { users }) => ({
            users: [...users],
            paginator: state.paginator,
            user: state.user
        }
    )),
    on(find, (state, { id }) => ({
        users: state.users,
        paginator: state.paginator,
        user: state.users.find(user => user.id == id) || new User()
    })),
    on(setPaginator, (state, { paginator }) => ({
        users: state.users,
        paginator: { ...paginator },
        user: state.user
    })) 
)