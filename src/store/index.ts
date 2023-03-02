import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {getTokenInfo} from "@/utils/storage";

// 参数二：初始化时要加载的状态   参数三中间件
const store = createStore(
    rootReducer,
    {
        login: getTokenInfo()
    },
    composeWithDevTools(applyMiddleware(thunk))
);
export type RootState = ReturnType<typeof store.getState>
export default store;
