import React, {Suspense} from "react";
import {Route, Redirect, Switch, Router} from "react-router-dom";
import {AuthRoute} from "@/components/AuthRoute";
import {history} from "@/utils/history";
import KeepAlive from "@/components/KeepAlive";

const Layout = React.lazy(() => import("@/pages/Layout"));
const Login = React.lazy(() => import("@/pages/Login"));
const ProfileEdit = React.lazy(() => import("@/pages/Profile/Edit"));
const Chat = React.lazy(() => import("@/pages/Profile/Chat"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));
const Feedback = React.lazy(() => import("@/pages/Profile/Feedback"));
const Search = React.lazy(() => import("@/pages/Home/compoents/Search"));
const SearchResult = React.lazy(() => import("@/pages/Home/compoents/Search/Result"));
const Article = React.lazy(() => import("@/pages/Article"));

export default function App() {
    return (
        <Router history={history}>
            <div className="app">
                {/*<Link to="/login">登录</Link>*/}
                {/*<Link to="/home">首页</Link>*/}
                <Suspense fallback={<div>loading...</div>}>
                    <KeepAlive component={Layout} alivePath='/home' path='/home' exact></KeepAlive>
                    <Switch>
                        <Redirect exact from="/" to="/home/index"></Redirect>
                        <Route path="/login" component={Login}></Route>
                        {/*<Route path="/home" component={Layout}></Route>*/}
                        <Route path="/search" exact component={Search}></Route>
                        <Route path="/search/result" exact component={SearchResult}></Route>
                        <Route path="/article/:id" exact component={Article}></Route>

                        <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
                        <AuthRoute path="/profile/chat" component={Chat}></AuthRoute>
                        <AuthRoute path="/profile/Feedback" component={Feedback}></AuthRoute>
                        {/*<Route component={NotFound}></Route>*/}
                        {/* 因为 /home 不在 Switch 内部，所以需要手动处理 /home 开头的路由，否则会被当做 404 处理 */}
                        <Route render={props => {
                            if (!props.location.pathname.startsWith('/home')) {
                                return <NotFound/>
                            }
                        }} />
                    </Switch>
                </Suspense>
            </div>
        </Router>
    );
}
