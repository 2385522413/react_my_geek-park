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
        dispatch(setUser(res.data.data))
    }
}

/**
 * 设置修改个人基本信息
 * @param {*} user
 * @returns
 */
export const saveProfile = payload => {
    return {
        type: 'profile/profile',
        payload
    }
}

/**
 * 获取修改用户基本信息
 * @returns thunk
 */
export const getProfile = () => {
    return async dispatch => {
        const res = await http.get('/user/profile')
        dispatch(saveProfile(res.data.data))
    }
}
