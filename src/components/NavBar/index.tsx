import React, {ReactElement} from "react";
import styles from "./index.module.scss";
import Icon from "@/components/Icon";
import {useHistory} from "react-router-dom";
import classNames from "classnames";

//import {withRouter} from "react-router-dom";
type Props = {
    children: string | ReactElement
    extra?: string | ReactElement
    onLeftClick?: () => void
    className?: string
}

function NavBar({children, extra, onLeftClick, className}: Props) {
    const history = useHistory();
    const back = () => {
        if (onLeftClick) {
            onLeftClick();
        } else {
            history.go(-1);
        }

    };
    return (
        <div className={classNames(styles.root, className)}>
            {/* 后退按钮 */}
            <div className="left" onClick={back}>
                <Icon type="iconfanhui"/>
            </div>
            {/* 居中标题 */}
            <div className="title">{children}</div>

            {/* 右侧内容 */}
            <div className="right">{extra}</div>
        </div>
    );
}

//export default withRouter(NavBar);
export default NavBar;
