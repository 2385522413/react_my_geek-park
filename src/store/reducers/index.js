import {combineReducers} from "redux";
import {login} from './login'
import {profile} from './profile'
const reducer = combineReducers({
    login,
    profile
});

export default reducer;
