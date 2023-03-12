import http from "@/utils/http";
import {RootThunkAction} from "@/store";

export function getArticleInfo(id: string):RootThunkAction {
    return async (dispatch: any) => {
        const res = await http.get(`/articles/${id}`)
        const info = res.data
        dispatch({
            type:'article/setArticleInfo',
            payload:info
        })
    }
}
