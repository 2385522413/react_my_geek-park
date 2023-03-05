type SearchType={
    suggestions: string[]
}
type SearchAction={
    type:'search/saveSuggestions'
    payload:string[]
}
const initialState:SearchType = {
    suggestions: [],
}
export const search = (state = initialState, action:SearchAction) => {
    const { type, payload } = action

    switch (type) {
        case 'search/saveSuggestions':
            return {
                ...state,
                suggestions: payload
            }

        default:
            return state
    }
}
