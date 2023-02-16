import React from "react";
import style from "./index.module.scss";
import NavBar from "@/components/NavBar";

function EditInput({onClose,type}) {
    return (
        <div className={style.root}>
            <NavBar extra={<span className="commit-btn">提交</span>}
                    onLeftClick={onClose}>{type==="name"?"编辑昵称":"编辑简介"}</NavBar>
            <h3>芜湖</h3>
        </div>
    );
}

export default EditInput;
