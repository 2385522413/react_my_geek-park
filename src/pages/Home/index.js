import React, {useEffect, useState} from "react";
import Tabs from "@/components/Tabs";
import {useDispatch, useSelector} from "react-redux";
import {getAllChannels, getUserChannels, setFeedbackAction} from "@/store/action/home";
import Icon from "@/components/Icon";
import styles from "./index.module.scss";
import Channels from "@/pages/Home/compoents/Channels";
import {Drawer} from "antd-mobile";
import ArticleList from "@/pages/Home/compoents/ArticleList";
import FeedbackActionMenu from "@/pages/Home/compoents/FeedbackActionMenu";
function Home(props) {

    // 处理频道高亮
    const [active, setActive] = useState(0);

    const changeActive = (index) => {
        setActive(index);
        dispatch(setFeedbackAction({
            visible:false,
            articleId:'',
            channelId:tabs[index].id
        }))
    };

    // 控制抽屉组件
// 控制频道管理抽屉的显示和隐藏
    const [drawerVisible, setDrawerVisible] = useState(false);
    const onClose = () => {
        setDrawerVisible(false);
    };
    const tabs = useSelector((state) => state.home.userChannels);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserChannels());
        // 获取所有的频道数据
        dispatch(getAllChannels());
    }, [dispatch]);
    return (
        <div className={styles.root}>
            <Tabs tabs={tabs} index={active} onChange={changeActive}>
                {/* 频道 Tab 对应的内容 */}
                {tabs.map(ch => <ArticleList key={ch.id} channelId={ch.id} />)}
            </Tabs>
            {/* 频道 Tab 栏右侧的两个图标按钮：搜索、频道管理 */}
            <div className="tabs-opration">
                <Icon type="iconbtn_search"/>
                <Icon type="iconbtn_channel" onClick={() => {
                    setDrawerVisible(true);
                }}/>
            </div>
            {/* 频道管理抽屉 */}
            <Drawer
                className="my-drawer"
                children={""}
                sidebar={drawerVisible && <Channels onClose={onClose}
                                                    index={active}
                                                    onChange={changeActive}
                />}
                open={drawerVisible}
            />
            <FeedbackActionMenu></FeedbackActionMenu>
        </div>

    );
}

export default Home;
