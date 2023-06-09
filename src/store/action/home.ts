import http from "@/utils/http";
import {getLocalChannels, hasToken, setLocalChannels} from "@/utils/storage";
import {RootThunkAction} from '../index'
import { Ariticle, Channel, FeedbackAction, HomeActionType} from "@/store/reducers/home";

/**
 * 将用户频道保存到 Redux
 * @param {Array} channels
 * @returns
 */
export const setUserChannels = (channels: Channel) => {
    return {
        type: "home/channel",
        payload: channels
    };
};

/**
 * 获取频道
 * @returns thunk
 */
/*export const getUserChannels = () => {
    return async (dispatch) => {
        // 请求数据
        const res = await http.get('/user/channels')
        const { channels } = res.data
        // 将频道数据保存到 Redux
        dispatch(setUserChannels(channels))
    }
}*/
export const getUserChannels = (): RootThunkAction => {
    return async (dispatch) => {
        // 1. 判断用户是否登录
        if (hasToken()) {
            const res = await http.get("/user/channels");
            dispatch(setUserChannels(res.data.channels));
        } else {
            // 2. 没有token,从本地获取频道数据
            const channels = getLocalChannels();
            if (channels) {
                // 没有token，但本地有channels数据
                dispatch(setUserChannels(channels));
            } else {
                // 没有token, 且本地没有channels数据
                const res = await http.get("/user/channels");
                dispatch(setUserChannels(res.data.channels));
                // 保存到本地
                setLocalChannels(res.data.channels);
            }
        }
    };
};

/**
 * 获取所有的频道
 */
export const getAllChannels = (): RootThunkAction => {
    return async (dispatch) => {
        // 请求数据
        const res = await http.get("/channels");
        const {channels} = res.data;

        // 将所有频道数据保存到 Redux
        dispatch(setAllChannels(channels));
    };
};

/**
 * 保存所有的频道
 * @param {*} channels
 * @returns
 */
export const setAllChannels = (channels: Channel) => {
    return {
        type: "home/allChannel",
        payload: channels
    };
};

// 删除频道
export const delChannel = (channel: Channel): RootThunkAction => {
    return async (dispatch, getState) => {
        // 获取到所有的userChannels
        const userChannels:any = getState().home.userChannels;
        // 如果登录了，发送请求获取频道信息
        if (hasToken()) {
            await http.delete(`/user/channels/${channel.id}`);
        } else {
            // 如果没有登录，将频道数据保存到本地
            // 将channels数据保存本地
            setLocalChannels(userChannels.filter((item:any) => item.id !== channel.id));
        }
        dispatch(
            setUserChannels(userChannels.filter((item:any) => item.id !== channel.id))
        );
    };
};

// 添加频道
export const addChannel = (channel: Channel): RootThunkAction => {
    return async (dispatch, getState) => {
        // 获取到所有的userChannels
        const userChannels = getState().home.userChannels;
        // 如果登录了，发送请求获取频道信息
        if (hasToken()) {
            await http.patch("/user/channels", {
                channels: [channel]
            });
        } else {
            // 如果没有登录，将频道数据保存到本地
            // 将channels数据保存本地
            // @ts-ignore
            setLocalChannels([...userChannels, channel]);
        }
        // @ts-ignore
        dispatch(setUserChannels([...userChannels, channel]));
    };
};


//获取文章列表数据
export const getArticleList = (channelId: number, timestamp: string, loadMore = false): RootThunkAction => {
    return async (dispatch) => {
        const res = await http.get("/articles", {
            params: {
                channel_id: channelId,
                timestamp: timestamp
            }
        });
        // 将数据保存到redux中
        dispatch(
            setArticleList({
                channelId,
                timestamp: res.data.pre_timestamp,
                list: res.data.results,
                loadMore
            })
        );
    };
};

//保存文章列表数据到redux
export const setArticleList = (payload: {
    channelId: number
    timestamp: string
    list: Ariticle[]
    loadMore?: boolean
}): HomeActionType => {
    return {
        type: "home/setArticleList",
        payload
    };
};
/**
 * 设置举报反馈菜单信息
 */
export const setFeedbackAction = ({visible, articleId, channelId}:FeedbackAction):HomeActionType => ({
    type: "home/feedback_action",
    payload: {
        visible,
        articleId,
        channelId,
    }
});

/**
 * 不喜欢
 */
export const unLikeArticle = (articleId:string):RootThunkAction => {
    return async (dispatch, getState) => {
        await http({
            method: 'post',
            url: '/article/dislikes',
            data: {
                target: articleId
            }
        })
        const channelId = getState().home.feedbackAction.channelId
        const articles = getState().home.articles[channelId]
        dispatch(setArticleList({
            channelId,
            timestamp: articles.timestamp,
            list: articles.list.filter((item) => item.art_id !== articleId),
        }))
    };
};

export const reportArticle = (articleId:string, reportId:number):RootThunkAction => {
    return async (dispatch, getState) => {
        await http({
            method: 'post',
            url: '/article/reports',
            data: {
                target: articleId,
                type: reportId
            }
        })
        const channelId = getState().home.feedbackAction.channelId
        const articles = getState().home.articles[channelId]
        dispatch(setArticleList({
            channelId,
            timestamp: articles.timestamp,
            list: articles.list.filter((item) => item.art_id !== articleId)
        }))
    };
}
