// 初始状态
const initialState = {
    userChannels: [],
    allChannels: [],
}

export const home = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case 'home/channel':
            return {
                ...state,
                userChannels: payload,
            }
        case 'home/allChannel':
            return {
                ...state,
                allChannels: payload,
            }
        default:
            return state
    }
}


