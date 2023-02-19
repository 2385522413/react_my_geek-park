import React, {Suspense} from "react";
import {Route, Redirect, Switch, Router} from "react-router-dom";
import {AuthRoute} from "@/components/AuthRoute";
import {history} from "@/utils/history";

const Layout = React.lazy(() => import("@/pages/Layout"));
const Login = React.lazy(() => import("@/pages/Login"));
const ProfileEdit = React.lazy(() => import("@/pages/Profile/Edit"));
const Chat = React.lazy(() => import("@/pages/Profile/Chat"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

export default function App() {
    return (
        <Router history={history}>
            <div className="app">
                {/*<Link to="/login">登录</Link>*/}
                {/*<Link to="/home">首页</Link>*/}
                <Suspense fallback={<div>loading...</div>}>
                    <Switch>
                        <Redirect exact from="/" to="/home"></Redirect>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/home" component={Layout}></Route>
                        <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
                        <AuthRoute path="/profile/chat" component={Chat}></AuthRoute>
                        <Route component={NotFound}></Route>
                    </Switch>
                </Suspense>
            </div>
        </Router>
    );
}
