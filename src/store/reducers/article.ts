// 初始状态
type Detail = {
    art_id: string
    attitude: number
    aut_id: string
    aut_name: string
    aut_photo: string
    comm_count: number
    content: string
    is_collected: boolean
    is_followed: boolean
    like_count: number
    pubdate: string
    read_count: number
    title: string
}
export type Comment = {
    aut_id: string
    aut_name: string
    aut_photo: string
    com_id: string
    content: string
    is_followed: boolean
    is_liking: boolean
    like_count: number
    pubdate: string
    reply_count: number
}

type CommentType = {
    end_id: string
    last_id: string
    total_count: number
    results: Comment[]
}
type ArticleType = {
    info: Detail
    comment:CommentType
}
export type ArticleAction = {
    type: 'article/setArticleInfo'
    payload: ArticleType
}|{
    type:'article/saveComment'
    payload:CommentType
}|{
    type:'article/saveMoreComment'
    payload:CommentType
}|{
    type:'article/saveNewComment'
    payload:Comment
}|{
    type:'article/updateComment'
    payload:Comment
}

const initialState: ArticleType = {
    // 文章详情数据
    info: {},
    //评论信息
    comment:{}
} as ArticleType

export function article(state = initialState, action: ArticleAction) {
    switch (action.type) {
        case 'article/setArticleInfo':
            return {
                ...state,
                info: action.payload,
            }
        case 'article/saveComment':
            return {
                ...state,
                comment: action.payload,
            }
        case 'article/saveMoreComment':
            return {
                ...state,
                comment: {
                    ...action.payload,
                    results: [...state.comment.results, ...action.payload.results],
                },
            }
        case 'article/saveNewComment':
            return {
                ...state,
                comment: {
                    ...state.comment,
                    results: [action.payload,...state.comment.results],
                },
            }
        case 'article/updateComment':
            return {
                ...state,
                comment: {
                    ...state.comment,
                    results: state.comment.results.map((item)=>{
                        if (item.com_id === action.payload.com_id) {
                            return {
                                ...action.payload
                            };
                        } else {
                            return item
                        }

                    })
                },
            }
        default:
            return state
    }
}
