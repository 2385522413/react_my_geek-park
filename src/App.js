import React, {Suspense} from "react";
import {Route, Redirect, Switch, BrowserRouter as Router} from "react-router-dom";

const Layout = React.lazy(() => import("@/pages/Layout"));
const Login = React.lazy(() => import("@/pages/Login"));

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
                    </Switch>
                </Suspense>
            </div>
        </Router>
    );
}
