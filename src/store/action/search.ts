import {RootThunkAction} from "@/store";
import http from "@/utils/http";
import {removeLocalHistories, setLocalHistories} from "@/utils/storage";

export function getSuggestList(keyword: string): RootThunkAction {
    return async(dispatch)=>{
        // 请求建议结果
        const res = await http.get('/suggestion', {
            params: {
                q: keyword
            }
        })
        let options=res.data.options
        if (!options[0]) {
            options=[]
        }
        dispatch({
            type:'search/saveSuggestions',
            payload:options
        });
    }
}

export function clearSuggestions(){
    return {
        type: 'search/clearSuggestions',
    }
}

export function addSearchList(keyword:string):RootThunkAction{
    return async (dispatch,getState)=>{
        //获取原来的historys
        let historys=getState().search.historys
        // 1. 不允许有重复的历史记录, 先删除原来历史记录中的keyword
        historys = historys.filter((item) => item !== keyword)
        // 添加keyword
        historys = [keyword, ...historys]
        // 最多显示10条
        if (historys.length > 10) {
            historys = historys.slice(0, 10)
        }
       dispatch({
           type:'search/saveHistorys',
           payload:historys
       })
        setLocalHistories(historys);
    }
}

/**
 * 清空历史记录
 * @returns
 */
export function clearHistories(): RootThunkAction {
    return async (dispatch) => {
        // 清空本地历史记录
        removeLocalHistories()
        // 清空redux数据
        dispatch({
            type: 'search/clearHistories',
        })
    }
}
