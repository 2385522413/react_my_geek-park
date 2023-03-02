import React, {useState} from "react";
import NavBar from "@/components/NavBar";
import styles from "./index.module.scss";
import Input from "@/components/Input";
import {useFormik} from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import {useDispatch} from "react-redux";
import {login, sendCode} from "@/store/action/login";
import {Toast} from "antd-mobile";
import {useHistory, useLocation} from "react-router-dom";

function Login() {
    const location=useLocation<{from:string}>()
    const history = useHistory();
    const dispatch = useDispatch();
    //倒计时
    const [time, setTime] = useState(0);

    // 表单验证
    const formik = useFormik({
        // 设置表单字段的初始值
        initialValues: {
            mobile: "13900001111",
            code: "246810"
        },
        // 提交表单
        onSubmit:async values => {
            await dispatch(login(values))
            Toast.success("登录成功", 1);
            if (location.state) {
                history.replace(location.state.from)
            }else {
                history.replace('/home');
            }

        },
        // formik的验证方法
        // validate(values) {
        //     let errors={}
        //     if (!values.mobile) {
        //         errors.mobile = '手机号不能为空';
        //     }
        //     if (!values.code) {
        //         errors.code = '验证码不能为空';
        //     }
        //     console.log(errors);
        //     return errors;
        // }
        // yup表单验证
        validationSchema: Yup.object().shape({
            // 手机号验证规则
            mobile: Yup.string()
                .required("请输入手机号")
                .matches(/^1[3456789]\d{9}$/, "手机号格式错误"),

            // 手机验证码验证规则
            code: Yup.string()
                .required("请输入验证码")
                .matches(/^\d{6}$/, "验证码6个数字")
        })
    });

    //发送验证码
    const onExtraClick = async () => {
        if (!/^1[3456789]\d{9}$/.test(formik.values.mobile)) {
            formik.setTouched({
                mobile: true
            });
            return;
        }
        await dispatch(sendCode(formik.values.mobile));
        Toast.success("获取验证码成功", 1);
        //开启倒计时
        setTime(60);
        let timeId = setInterval(() => {
            setTime((time) => {
                if (time === 1) {
                    clearInterval(timeId);
                }
                return time - 1;
            });
        }, 1000);
    };
    return (
        <div className={styles.root}>
            <NavBar>登录</NavBar>
            <div className="content">
                {/* 标题 */}
                <h3>短信登录</h3>
                <form onSubmit={formik.handleSubmit}>
                    {/* 手机号输入框 */}
                    <div className="input-item">
                        <Input
                            placeholder="请输入手机号"
                            onChange={formik.handleChange}
                            value={formik.values.mobile}
                            name="mobile"
                            onBlur={formik.handleBlur}
                        >
                        </Input>
                        {formik.errors.mobile && formik.touched.mobile ?
                            <div className="validate">{formik.errors.mobile}</div>
                            : null}
                    </div>

                    {/* 短信验证码输入框 */}
                    <div className="input-item">
                        <Input
                            placeholder="请输入手机号"
                            extra={time === 0 ? "获取验证码" : time + "s后获取"}
                            onExtraClick={onExtraClick}
                            onChange={formik.handleChange}
                            value={formik.values.code}
                            name="code"
                            onBlur={formik.handleBlur}
                        >
                        </Input>
                        {formik.errors.code && formik.touched.code ?
                            <div className="validate">{formik.errors.code}</div>
                            : null}
                    </div>

                    {/* 登录按钮 */}
                    <button
                        type="submit"
                        className={classnames("login-btn", formik.isValid ? "" : "disabled")}
                        disabled={!formik.isValid}
                    >
                        登录
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
