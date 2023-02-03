import React from "react";
import NavBar from "@/components/NavBar";
import styles from "./index.module.scss";
import Input from "@/components/Input";
import {useFormik} from "formik";
import * as Yup from 'yup'
function Login() {
    // 表单验证
    const formik = useFormik({
        // 设置表单字段的初始值
        initialValues: {
            mobile: "13900001111",
            code: "246810"
        },
        // 提交
        onSubmit: values => {
            console.log(values);
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
                .required('请输入手机号')
                .matches(/^1[3456789]\d{9}$/, '手机号格式错误'),

            // 手机验证码验证规则
            code: Yup.string()
                .required('请输入验证码')
                .matches(/^\d{6}$/, '验证码6个数字')
        }),
    });

    const onExtraClick = () => {
        console.log("hhahah");
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
                        {formik.errors.mobile && formik.touched.mobile?
                            <div className="validate">{formik.errors.mobile}</div>
                        :null}
                    </div>

                    {/* 短信验证码输入框 */}
                    <div className="input-item">
                        <Input
                            placeholder="请输入手机号"
                            extra="获取验证码"
                            onExtraClick={onExtraClick}
                            onChange={formik.handleChange}
                            value={formik.values.code}
                            name="code"
                            onBlur={formik.handleBlur}
                        >
                        </Input>
                        {formik.errors.code && formik.touched.code?
                            <div className="validate">{formik.errors.code}</div>
                            :null}
                    </div>

                    {/* 登录按钮 */}
                    <button type="submit" className="login-btn">
                        登录
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
