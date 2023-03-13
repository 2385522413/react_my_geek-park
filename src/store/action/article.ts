import http from "@/utils/http";
import {RootThunkAction} from "@/store";

export function getArticleInfo(id: string):RootThunkAction {
    return async (dispatch) => {
        const res = await http.get(`/articles/${id}`)
        const info = res.data
        dispatch({
            type:'article/setArticleInfo',
            payload:info
        })
    }
}

/**
 * 获取文章的评论列表
 * @param {String} obj.type 评论类型
 * @param {String} obj.source 评论ID
 * @returns thunk
 */
type getArticleCommentsType={
    type:string
    source:string
}
export const getArticleComments = ({ type, source }:getArticleCommentsType):RootThunkAction => {
    return async (dispatch) => {
        // 准备发送请求

        // 发送请求
        const res = await http.get('/comments', {
            params: { type, source }
        })
        console.log(res)
        // 请求成功，保存数据
        dispatch({
            type:'article/saveComment',
            payload:res.data
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
