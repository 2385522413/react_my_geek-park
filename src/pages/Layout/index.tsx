import React,{Suspense} from "react";
import Icon from "@/components/Icon";
import styles from "./index.module.scss"
import classnames from "classnames";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import {AuthRoute} from "@/components/AuthRoute";
import KeepAlive from "@/components/KeepAlive";


const Home = React.lazy(() => import('@/pages/Home'))
const QA = React.lazy(() => import('@/pages/QA'))
const Video = React.lazy(() => import('@/pages/Video'))
const Profile = React.lazy(() => import('@/pages/Profile'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))
// 将 tab 按钮的数据放在一个数组中
// - id 唯一性ID
// - title 按钮显示的文本
// - to 点击按钮后切换到的页面路径
// - Icon 按钮上显示的图标名称
const taBar = [
    { id: 1, title: '首页', path: '/home/index', icon: 'iconbtn_home' },
    { id: 2, title: '问答', path: '/home/question', icon: 'iconbtn_qa' },
    { id: 3, title: '视频', path: '/home/video', icon: 'iconbtn_video' },
    { id: 4, title: '我的', path: '/home/profile', icon: 'iconbtn_mine' }
]

function Layout() {
    const history = useHistory()
    const location = useLocation()

    return (
        <div className={styles.root}>
            {/* 区域一：点击按钮切换显示内容的区域 */}
            <div className="tab-content">
                {/*配置二级路由*/}
                <div className="tab-content">
                  <Suspense fallback={<div>loading</div>}>
                      <KeepAlive component={Home} alivePath='/home/index' path='/home/index' exact></KeepAlive>
                      <Switch>
                          {/*<Route path="/home" exact component={Home} />*/}
                          <Route path="/home/question" exact component={QA} />
                          <Route path="/home/video" exact component={Video} />
                          <AuthRoute path="/home/profile" exact component={Profile} />
                          <Route component={NotFound}></Route>
                      </Switch>
                  </Suspense>
                </div>
            </div>
            {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
            <div className="tabbar">
                {
                    taBar.map((item)=>{
                        return (
                            <div
                                key={item.id}
                                className={classnames(
                                    'tabbar-item',
                                    location.pathname===item.path ? 'tabbar-item-active' : ''
                                )}
                                onClick={() => history.push(item.path)}
                            >
                                <Icon type={`${location.pathname===item.path  ? `${item.icon}_sel` : item.icon}`} />
                                <span>{item.title}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    );
}

export default Layout;
