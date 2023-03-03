import http from "@/utils/http"
import { setTokenInfo} from "@/utils/storage";
import {Dispatch} from "redux";
import {LoginActionType} from '../reducers/login'
/**
 * 发送短信验证码
 * @param {string} mobile 手机号码
 * @returns thunk
 */
export const sendCode = (mobile:number | string) => {
    return async (dispatch:Dispatch) => {
      const res=await http.get(`/sms/codes/${mobile}`)
        console.log(res);
    }
}

type Token = {
    token: string
    refresh_token: string
}
//保存token到redux中
export const saveToken=(tokenInfo:Token):LoginActionType=>{
    return {
        type: 'login/token',
        payload: tokenInfo
    }
}

/**
 *
 * @param params
 * @returns {(function(*): Promise<void>)|*}
 */
export const login = (params:{ mobile: string; code: string }) => {
    return async (dispatch:Dispatch) => {
        const res = await http.post('/authorizations', params)
        //保存token到redux中
        dispatch(saveToken(res.data))
        //保存token到浏览器
        setTokenInfo(res.data)
    }
}

/**
 * 退出
 * @returns
 */
export const logout = (payload:Token) => {
    return {
        type: 'login/logout' as const,
        payload,
    }
}
