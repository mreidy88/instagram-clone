import { combineReducers } from 'redux';
import { user } from './user';
import { users } from './user';

const Reducers = combineReducers({
    userState: user,
    usersState: users
})

export default Reducers;