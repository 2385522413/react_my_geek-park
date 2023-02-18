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

/**
 * 修改 昵称、简介、生日、性别 个人资料信息
 * @param {属性名} name 要修改的属性名称
 * @param {属性值} value 要修改的属性值
 * @returns thunk
 */
export const updateProfile = (data) => {
    return async dispatch => {
        const res = await http.patch('/user/profile', data)
        console.log(res)
        // 更新成功
        if (res.data.message === 'OK') {
            dispatch(getProfile())
        }
    }
}

export const updateAvatar = (formData) => {
    return async dispatch => {
        const res = await http.patch('/user/photo', formData)
        // 更新成功
        if (res.data.message === 'OK') {
            dispatch(getProfile())
        }
    }
}
