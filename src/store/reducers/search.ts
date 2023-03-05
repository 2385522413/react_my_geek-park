type SearchType = {
    suggestions: string[]
    historys: string[]
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
}
const initialState: SearchType = {
    suggestions: [],
    historys: []
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
        default:
            return state
    }
}
