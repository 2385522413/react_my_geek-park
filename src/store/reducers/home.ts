type Channel = {
    id: number
    name: string
}

type FeedbackAction = {
    visible: boolean
    articleId: string
    channelId: number
}

type Ariticle = {
    art_id: string
    title: string
    aut_id: string
    aut_name: string
    comm_count: string
    pubdate: string
    cover: {
        type: string
        images: string[]
    }
}

type Articles = {
    [index: number]: {
        timestamp: string
        list: Ariticle[]
    }
}
type HomeType = {
    userChannels: Channel[]
    allChannels: Channel[]
    feedbackAction: FeedbackAction
    articles: Articles
}

// 初始状态
const initialState:HomeType = {
    userChannels: [],
    allChannels: [],
    articles:{},
    feedbackAction: {
        // 控制弹出菜单的显示隐藏
        visible: false,
        // 当前反馈的目标文章ID
        articleId: '',
        //频道id
        channelId:-1
    }
}

type ActionType =
    | {
    type: 'home/channel'
    payload: Channel[]
}
    | {
    type: 'home/allChannel'
    payload: Channel[]
}
    | {
    type: 'home/setArticleList'
    payload: {
        channelId: number
        timestamp: string
        list: Ariticle[],
        loadMore:boolean
    }
}
    | {
    type: 'home/feedback_action'
    payload: FeedbackAction
} /*| {
    type: 'home/saveMoreArticleList'
    payload: {
        channelId: number
        timestamp: string
        list: Ariticle[]
    }
}*/

export const home = (state = initialState, action:ActionType) => {
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
        case 'home/feedback_action':
            return {
                ...state,
                feedbackAction: payload
            }

        default:
            return state
    }
}


