import NavBar from "@/components/NavBar";
import {DatePicker, Drawer, List, Modal, Toast} from "antd-mobile";
import {useHistory} from "react-router-dom";
import styles from "./index.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {getProfile, updateProfile} from "@/store/action/profile";
import classNames from "classnames";
import EditInput from "@/pages/Profile/Edit/components/EditInput";
import EditList from "@/pages/Profile/Edit/components/EditList";
import {updateAvatar} from "@/store/action/profile";
import dayjs from "dayjs";
import {logout} from "@/store/action/login";
const alert = Modal.alert

const ProfileEdit = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = useState({
        visible: false,
        type: ""
    });
    const [openList, setOpenList] = useState({
        visible: false,
        type: ""
    });
    const config = {
        photo: [
            {
                title: "拍照",
                onClick: () => {
                    console.log("拍照");
                }
            },
            {
                title: "本地选择",
                onClick: () => {
                    fileRef.current.click()
                }
            }
        ],
        gender: [
            {
                title: "男",
                onClick: () => {
                 onCommit("gender",0)
                }
            },
            {
                title: "女",
                onClick: () => {
                    onCommit("gender",0)
                }
            }
        ]
    };
    //关闭
    const onClose = () => {
        setOpen({
            visible: false,
            type: ""
        });
    };
    const onCloseOpenList = () => {
        setOpenList({
            visible: false,
            type: ""
        });
    };
    //上传图片
    const fileRef=useRef(null)
    const onUpdatePhoto=(e) => {
        const photo = e.target.files[0]
        const formData = new FormData()
        formData.append('photo', photo)
        dispatch(updateAvatar(formData))
        onCloseOpenList()
        Toast.success("修改成功",1,null,false)
    }
    //上传日期
    const onBirthday=(e)=>{
        onCommit('birthday',dayjs(e).format("YYYY-MM-DD"))
    }
    //退出登录
    // 退出
    const onLogout = () => {
        alert('温馨提示', '你确定退出吗？', [
            {
                text: '取消'
            },
            {
                style: { color: '#FC6627' },
                text: '确认',
                onPress: () => {
                    // 删除 Token 信息
                    dispatch(logout())
                    // 跳转到登录页
                    history.replace('/login')
                }
            }
        ])
    }

    const profile = useSelector((state) => state.profile.profile);
    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    //提交
    const onCommit = async (type, value) => {
        await dispatch(updateProfile({
            [type]: value
        }));
        Toast.success("修改成功", 1, null, false);
        onClose();
        onCloseOpenList()
    };
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
                                       setOpenList({
                                           visible: true,
                                           type: "photo"
                                       });
                                   }}
                        >头像</List.Item>

                        <List.Item arrow="horizontal" extra={profile.name} onClick={() => {
                            setOpen({
                                visible: true,
                                type: "name"
                            });
                        }}>昵称</List.Item>

                        <List.Item arrow="horizontal" extra={
                            <span
                                className={classNames("intro", profile.intro ? "normal" : "")}>{profile.intro ? profile.intro : "未填写"}</span>}
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
                        <List.Item
                            arrow="horizontal"
                            extra={profile.gender === 0 ? "男" : "女"}
                            onClick={() => {
                                setOpenList({
                                    visible: true,
                                    type: "gender"
                                });
                            }}
                        >性别</List.Item>
                        <DatePicker
                            mode="date"
                            title="选择年月日"
                            value={new Date(profile.birthday)}
                            minDate={new Date(1900, 1, 1, 0, 0, 0)}
                            maxDate={new Date()}
                            onChange={onBirthday}
                        >
                            <List.Item arrow="horizontal" extra={"2020-02-02"}>生日</List.Item>
                        </DatePicker>
                    </List>

                    {/* 文件选择框，用于头像图片的上传 */}
                    <input type="file" hidden ref={fileRef} onChange={onUpdatePhoto} />

                </div>
                {/* 底部栏：退出登录按钮 */}
                <div className="logout">
                    <button className="btn" onClick={onLogout}>退出登录</button>
                </div>
            </div>
            <Drawer
                position="right"
                className="drawer"
                style={{minHeight: document.documentElement.clientHeight}}
                sidebar={open.visible && <EditInput onClose={onClose} type={open.type} onCommit={onCommit}></EditInput>}
                children={""}
                open={open.visible}
            />
            {/* 头像、性别 */}
            <Drawer
                className="drawer-list"
                position="bottom"
                sidebar={openList.visible && <EditList config={config} type={openList.type} onClose={onCloseOpenList}/>}
                open={openList.visible}
                onOpenChange={onCloseOpenList}
                onClose={onCloseOpenList}
                children={""}
            >
            </Drawer>
        </div>
    );
};

export default ProfileEdit;
