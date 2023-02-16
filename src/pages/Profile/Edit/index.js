import NavBar from "@/components/NavBar";
import {DatePicker, Drawer, List} from "antd-mobile";
import {useHistory} from "react-router-dom";
import styles from "./index.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getProfile} from "@/store/action/profile";
import classNames from "classnames";
import EditInput from "@/pages/Profile/Edit/components/EditInput";

const ProfileEdit = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = useState({
        visible: false,
        type: ""
    });
    const onClose = () => {
        setOpen({
            visible: false,
            type: ""
        });
    };
    const profile = useSelector((state) => state.profile.profile);
    console.log(profile);
    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);
    return (
        <div className={styles.root}>
            <div className="content">

                {/* 顶部导航栏 */}
                <NavBar onLeftClick={() => history.go(-1)}>个人信息</NavBar>

                <div className="wrapper">
                    {/* 列表一：显示头像、昵称、简介 */}
                    <List className="profile-list">
                        <List.Item arrow="horizontal"
                                   extra={<span className="avatar-wrapper"><img src={profile.photo} alt=""/></span>}
                                   onClick={() => {
                                       console.log(1111);
                                   }}
                        >头像</List.Item>

                        <List.Item arrow="horizontal" extra={profile.name} onClick={() => {
                            setOpen({
                                visible: true,
                                type: "name"
                            });
                        }}>昵称</List.Item>

                        <List.Item arrow="horizontal" extra={
                            <span className={classNames("intro", profile.intro ? "normal" : "")}>{profile.intro ? profile.intro : "未填写"}</span>}
                                   onClick={() => {
                                       setOpen({
                                           visible: true,
                                           type: "intro"
                                       });
                                   }}
                        >简介</List.Item>
                    </List>

                    {/* 列表二：显示性别、生日 */}
                    <List className="profile-list">
                        <List.Item arrow="horizontal" extra={profile.gender === 0 ? "男" : "女"}>性别</List.Item>
                        <DatePicker
                            mode="date"
                            title="选择年月日"
                            value={new Date(profile.birthday)}
                            minDate={new Date(1900, 1, 1, 0, 0, 0)}
                            maxDate={new Date()}
                            onChange={() => {
                            }}
                        >
                            <List.Item arrow="horizontal" extra={"2020-02-02"}>生日</List.Item>
                        </DatePicker>
                    </List>

                    {/* 文件选择框，用于头像图片的上传 */}
                    <input type="file" hidden/>

                </div>
                {/* 底部栏：退出登录按钮 */}
                <div className="logout">
                    <button className="btn">退出登录</button>
                </div>
            </div>
            <Drawer
                position="right"
                className="drawer"
                style={{minHeight: document.documentElement.clientHeight}}
                sidebar={<EditInput onClose={onClose} type={open.type}></EditInput>}
                children={""}
                open={open.visible}
            />
        </div>
    );
};

export default ProfileEdit;
