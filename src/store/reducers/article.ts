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
type ArticleType = {
    info: Detail
}
type ArticleAction = {
    type: 'article/setArticleInfo'
    payload: ArticleType
}
const initialState: ArticleType = {
    // 文章详情数据
    info: {},
} as ArticleType
export  function article(state=initialState,action:ArticleAction){
    switch (action.type) {
        case 'article/setArticleInfo':
            return {
                ...state,
                info: action.payload,
            }
        default:
            return state
    }
}
