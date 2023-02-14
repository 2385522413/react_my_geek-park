import React from "react";
import styles from './index.module.scss'
import Icon from "@/components/Icon";
import {useHistory} from "react-router-dom";
//import {withRouter} from "react-router-dom";

function NavBar({children,extra}) {
    const history = useHistory();
    const back=()=>{
        console.log(history);
        history.go(-1)
    }
    return (
        <div className={styles.root}>
            {/* 后退按钮 */}
            <div className="left" onClick={back}>
                <Icon type="iconfanhui" />
            </div>
            {/* 居中标题 */}
            <div className="title">{children}</div>

            {/* 右侧内容 */}
            <div className="right">extra</div>
        </div>
    )
}

//export default withRouter(NavBar);
export default NavBar;
