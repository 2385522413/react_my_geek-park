// 初始状态
const initialState = {
    userChannels: [],
    allChannels: [],
    articles:{}
}

export const home = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case 'home/channel':
            return {
                ...state,
                userChannels: payload,
            }
        case 'home/allChannel':
            return {
                ...state,
                allChannels: payload,
            }
        case 'home/setArticleList':
            return {
                ...state,
                articles: {
                    ...state.articles,
                    [payload.channelId]: {
                        timestamp: payload.timestamp,
                        list: payload.list,
                    },
                },
            }
        default:
            return state
    }
}


