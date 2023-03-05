import {RootThunkAction} from "@/store";
import http from "@/utils/http";

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
