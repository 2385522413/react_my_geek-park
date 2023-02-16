import React, {useState} from "react";
import style from "./index.module.scss";
import NavBar from "@/components/NavBar";
import Textarea from "@/components/Textarea";

function EditInput({onClose,type}) {
    const [value, setValue] = useState("hahah" || '')

    const onValueChange = e => {
        setValue(e.target.value)
    }
    return (
        <div className={style.root}>
            <NavBar extra={<span className="commit-btn">提交</span>}
                    onLeftClick={onClose}>{type==="name"?"编辑昵称":"编辑简介"}</NavBar>
            <Textarea
                placeholder="请输入"
                value={value}
                onChange={onValueChange}
            />
        </div>
    );
}

export default EditInput;
