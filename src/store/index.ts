import {applyMiddleware, createStore,AnyAction} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk, {ThunkAction} from "redux-thunk";
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

// 获取RootState的类型‘
// typeof: 获取store.getState的类型
// ReturnType 获取返回值的类型
export type RootState = ReturnType<typeof store.getState>
// R：thunk的action的返回类型  void Promise<void>
// S: 需要指定个getState的返回类型  RootState
// E: extra: 额外的参数 any
// A: 需要指定Action的类型 Action AnyAction [extraProps: string]: any
// ThunkAction<R, S, E, A>
export type RootThunkAction = ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    AnyAction
    >
export default store;
