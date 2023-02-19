import {combineReducers} from "redux";
import {login} from './login'
import {profile} from './profile'
import {home} from './home'
const reducer = combineReducers({
    login,
    profile,
    home
});

export default reducer;
