import React, {useState} from "react";
import style from "./index.module.scss";
import NavBar from "@/components/NavBar";
import Textarea from "@/components/Textarea";
import Input from "@/components/Input";
import {useSelector} from "react-redux";

function EditInput({onClose, type, onCommit}) {
    //从redux中拿数据
    const defaultValue = useSelector((state) => {
        return state.profile.profile[type];
    });
    //设置受控组件
    const [value, setValue] = useState(defaultValue || "");
    const onValueChange = e => {
        setValue(e.target.value);
    };

    return (
        <div className={style.root}>
            <NavBar extra={<span className="commit-btn" onClick={() => {
                onCommit(type, value);
            }}>提交</span>}
                    onLeftClick={onClose}>{type === "name" ? "编辑昵称" : "编辑简介"}</NavBar>
            <div className="content-box">
                {type === "name" ? (
                    <div className="input-wrap">
                        <Input
                            autoFocus
                            value={value}
                            onChange={onValueChange}/>
                    </div>
                ) : (
                    <Textarea
                        placeholder="请输入"
                        value={value}
                        onChange={onValueChange}
                    />
                )}
            </div>
        </div>
    );
}

export default EditInput;
