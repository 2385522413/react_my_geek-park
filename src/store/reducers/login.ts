type Token = {
    token: string
    refresh_token: string
}
type ActionType = {
    type: 'login/token' | 'login/logout'
    payload: Token
}
// 初始状态
const initialState = {
    token: '',
    refresh_token: ''
}

// 操作 Token 状态信息的 reducer 函数
export const login = (state = initialState, action:ActionType) => {
    const { type, payload } = action
    switch (type) {
        case 'login/token': return { ...payload }
        case 'login/logout': return {} as Token
        default: return state
    }

}
