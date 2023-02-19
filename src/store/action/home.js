import http from '@/utils/http'
import {getLocalChannels, hasToken, setLocalChannels} from "@/utils/storage";
/**
 * 将用户频道保存到 Redux
 * @param {Array} channels
 * @returns
 */
export const setUserChannels = (channels) => {
    return {
        type: 'home/channel',
        payload: channels,
    }
}

/**
 * 获取频道
 * @returns thunk
 */
/*export const getUserChannels = () => {
    return async (dispatch) => {
        // 请求数据
        const res = await http.get('/user/channels')
        const { channels } = res.data.data
        // 将频道数据保存到 Redux
        dispatch(setUserChannels(channels))
    }
}*/
export const getUserChannels = () => {
    return async (dispatch) => {
        // 1. 判断用户是否登录
        if (hasToken()) {
            const res = await http.get('/user/channels')
            dispatch(setUserChannels(res.data.data.channels))
        } else {
            // 2. 没有token,从本地获取频道数据
            const channels = getLocalChannels()
            if (channels) {
                // 没有token，但本地有channels数据
                dispatch(setUserChannels(channels))
            } else {
                // 没有token, 且本地没有channels数据
                const res = await http.get('/user/channels')
                dispatch(setUserChannels(res.data.data.channels))
                // 保存到本地
                setLocalChannels(res.data.data.channels)
            }
        }
    }
}
