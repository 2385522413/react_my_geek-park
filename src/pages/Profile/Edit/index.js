import NavBar from "@/components/NavBar";
import {DatePicker, List} from "antd-mobile";
import {useHistory} from "react-router-dom";
import styles from "./index.module.scss";

const ProfileEdit = () => {
    const history = useHistory();

    return (
        <div className={styles.root}>
            <div className="content">

                {/* 顶部导航栏 */}
                <NavBar onLeftClick={() => history.go(-1)}>个人信息</NavBar>

                <div className="wrapper">
                    {/* 列表一：显示头像、昵称、简介 */}
                    <List className="profile-list">
                        <List.Item arrow="horizontal" extra={
                            <span className="avatar-wrapper">
                               <img src={""} alt=""/>
                            </span>
                        }>头像</List.Item>

                        <List.Item arrow="horizontal" extra={"昵称xxxx"}>昵称</List.Item>

                        <List.Item arrow="horizontal" extra={
                            <span className="intro">{"未填写"}</span>
                        }>简介</List.Item>
                    </List>

                    {/* 列表二：显示性别、生日 */}
                    <List className="profile-list">
                        <List.Item arrow="horizontal" extra={"男"}>性别</List.Item>
                        <DatePicker
                            mode="date"
                            title="选择年月日"
                            value={new Date()}
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
            </div>
            {/* 底部栏：退出登录按钮 */}
            <div className="logout">
                <button className="btn">退出登录</button>
            </div>
        </div>
    );
};

export default ProfileEdit;
