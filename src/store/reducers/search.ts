type SearchType = {
    suggestions: string[]
    historys: string[]
    results: string[]
}
type SearchAction = {
    type: 'search/saveSuggestions'
    payload: string[]
} | {
    type: 'search/clearSuggestions'
} | {
    type: 'search/saveHistorys'
    payload: string[]
} | {
    type: 'search/clearHistories'
} | {
    type: 'search/saveResults'
    payload:string[]
};
const initialState: SearchType = {
    suggestions: [],
    historys: [],
    // 存放搜索的结果
    results: [],
}
export const search = (state = initialState, action: SearchAction) => {
    switch (action.type) {
        case 'search/saveSuggestions':
            return {
                ...state,
                suggestions: action.payload
            }
        case 'search/clearSuggestions':
            return {
                ...state,
                suggestions: []
            }
        case 'search/saveHistorys':
            return {
                ...state,
                historys: action.payload
            }
        case 'search/clearHistories' :
            return {
                ...state,
                historys: []
            }
        case 'search/saveResults' :
            return {
                ...state,
                results: [...state.results,...action.payload],
            }
        default:
            return state
    }
}
