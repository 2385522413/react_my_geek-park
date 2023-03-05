type SearchType={
    suggestions: string[]
}
type SearchAction={
    type:'search/saveSuggestions'
    payload:string[]
}|{
    type:'search/clearSuggestions'
}
const initialState:SearchType = {
    suggestions: [],
}
export const search = (state = initialState, action:SearchAction) => {
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
        default:
            return state
    }
}
