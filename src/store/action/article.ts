import http from "@/utils/http";
import {RootThunkAction} from "@/store";

export function getArticleInfo(id: string): RootThunkAction {
    return async (dispatch) => {
        const res = await http.get(`/articles/${id}`)
        const info = res.data
        dispatch({
            type: 'article/setArticleInfo',
            payload: info
        })
    }
}

/**
 * 获取文章的评论列表
 * @param {String} obj.type 评论类型
 * @param {String} obj.source 评论ID
 * @returns thunk
 */
type getArticleCommentsType = {
    type: string
    source: string
}
export const getArticleComments = ({type, source}: getArticleCommentsType): RootThunkAction => {
    return async (dispatch) => {
        // 准备发送请求

        // 发送请求
        const res = await http.get('/comments', {
            params: {type, source}
        })
        // 请求成功，保存数据
        dispatch({
            type: 'article/saveComment',
            payload: res.data
        })
    }
}

// 获取文章的评论
export function getMoreCommentList(id: string, offset: string): RootThunkAction {
    return async (dispatch) => {
        const res = await http.get('/comments', {
            params: {
                type: 'a',
                source: id,
                offset,
            },
        })
        dispatch({
            type: 'article/saveMoreComment',
            payload: res.data,
        })
    }
}

//点赞
export function likeAritcle(id: string, attitude: number): RootThunkAction {
    return async (dispatch) => {
        if (attitude === 1) {
            // 取消点赞
            await http.delete('/article/likings/' + id)
        } else {
            // 点赞
            await http.post('/article/likings', {target: id})
        }
        // 更新
        await dispatch(getArticleInfo(id))
    }
}

//收藏
export function collectAritcle(id: string, isCollect: boolean): RootThunkAction {
    return async (dispatch) => {
        if (isCollect) {
            // 取消点赞
            await http.delete('/article/collections/' + id)
        } else {
            // 点赞
            await http.post('/article/collections', {target: id})
        }
        // 更新
        await dispatch(getArticleInfo(id))
    }
}


//发表评论
export function onComment(articleId: string, content: string): RootThunkAction {
    return async (dispatch,getState) => {

        const res = await http.post('/comments',{
            target:articleId,
            content
        })
        dispatch({
            type:'article/saveNewComment',
            payload:res.data.new_obj
        })
        //@ts-ignore
        dispatch(getArticleInfo(getState().article.info.art_id))
    }
}

export function updateComment(comment: { aut_name: string; aut_photo: string; like_count: number; is_liking: boolean; aut_id: string; com_id: string; is_followed: boolean; reply_count: number; content: string; pubdate: string }){
    return{
        type:'article/updateComment',
        payload:comment
    }
}
