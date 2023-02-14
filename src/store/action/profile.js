import http from "@/utils/http"

/**
 * 设置个人基本信息
 * @param {*} user
 * @returns
 */
export const setUser = user => {
    return {
        type: 'profile/user',
        payload: user
    }
}

/**
 * 获取用户基本信息
 * @returns thunk
 */
export const getUser = () => {
    return async dispatch => {
        const res = await http.get('/user')
        console.log(res);
        dispatch(setUser(res.data.data))
    }
}

