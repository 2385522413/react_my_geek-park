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
            const {timestamp,channelId,list,loadMore}=payload
            const oldList=state.articles[channelId]?.list
            //console.log([state.articles[channelId].list,...list]);
            return {
                ...state,
                articles: {
                    ...state.articles,
                    [channelId]: {
                        timestamp: timestamp,
                        list: loadMore ?[...oldList,...list] :list
                    },
                },
            }


        default:
            return state
    }
}


