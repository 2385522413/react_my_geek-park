import React, {Suspense} from "react";
import {Route, Redirect, Switch, BrowserRouter as Router} from "react-router-dom";

const Layout = React.lazy(() => import("@/pages/Layout"));
const Login = React.lazy(() => import("@/pages/Login"));
const ProfileEdit = React.lazy(() => import("@/pages/Profile/Edit"));
const Chat = React.lazy(() => import("@/pages/Profile/Chat"));

export default function App() {
    return (
        <Router>
            <div className="app">
                {/*<Link to="/login">登录</Link>*/}
                {/*<Link to="/home">首页</Link>*/}
                <Suspense fallback={<div>loding...</div>}>
                    <Switch>
                        <Redirect exact from="/" to="/home"></Redirect>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/home" component={Layout}></Route>
                        <Route path="/profile/edit" component={ProfileEdit}></Route>
                        <Route path="/profile/chat" component={Chat}></Route>
                    </Switch>
                </Suspense>
            </div>
        </Router>
    );
}
