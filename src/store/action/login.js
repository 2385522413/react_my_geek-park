import http from "@/utils/http"
import {removeTokenInfo, setTokenInfo} from "@/utils/storage";

/**
 * 发送短信验证码
 * @param {string} mobile 手机号码
 * @returns thunk
 */
export const sendCode = (mobile) => {
    return async (dispatch) => {
      const res=await http.get(`/sms/codes/${mobile}`)
        console.log(res);
    }
}

//保存token到redux中
export const saveToken=(tokenInfo)=>{
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
export const login = params => {
    return async dispatch => {
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
export const logout = () => {
    return (dispatch) => {
        removeTokenInfo()
        dispatch({
            type: 'login/logout',
        })
    }
}
