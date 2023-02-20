import React, {useEffect, useState} from "react";
import Tabs from "@/components/Tabs";
import {useDispatch, useSelector} from "react-redux";
import {getAllChannels, getUserChannels} from "@/store/action/home";
import Icon from "@/components/Icon";
import styles from "./index.module.scss";
import Channels from "@/pages/Home/compoents/Channels";
import {Drawer} from "antd-mobile";

function Home(props) {

    // 处理频道高亮
    const [active, setActive] = useState(0);

    const changeActive = (index) => {
        setActive(index);
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
            <Tabs tabs={tabs} index={active} onChange={changeActive}></Tabs>
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
        </div>

    );
}

export default Home;
